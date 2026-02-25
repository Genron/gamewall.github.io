import fs from "fs";
import {parseStringPromise} from "xml2js";
// import {bearerToken, username} from "./credentials.js";
const bearerToken = process.env.BEARER_TOKEN;
const username = process.env.USER_NAME;

function mapToNumbers(obj) {
    if (typeof obj === 'string') {
        if (obj === 'true') {
            return true;
        }
        if (obj === 'false') {
            return false;
        }
        const n = Number(obj);
        if (isNaN(n)) {
            return obj.replaceAll(/[–-]/gm, '-');
        } else {
            return n;
        }
    }
    if (Array.isArray(obj)) {
        return obj.map(mapToNumbers);
    }
    return Object.entries(obj).reduce((e, [key, value]) => {
        e[key] = mapToNumbers(value);
        return e;
    }, {});
}

async function doFetch(url) {
    console.log(`fetchCollection(${url})`);
    return fetch(`https://boardgamegeek.com/xmlapi2/${url}`, {
        headers: {
            Accept: "application/xml", Authorization: `Bearer ${bearerToken}`
        }
    })
        .then(res => res.text())
        .catch(cause => {
            throw new Error(`BGG request failed: ${cause.status} ${cause.statusText}`, {cause});
        })
        .then(xml => parseStringPromise(xml, {
            explicitArray: false,
            mergeAttrs: true,
            charkey: "_",
            attrkey: "$",
        }))
        .then(mapToNumbers)
        .catch(cause => {
            throw new Error(`Json parsing failed: ${cause.status} ${cause.statusText}`, {cause});
        });
}

async function fetchFromBGG(url) {
    const collection = await doFetch(url);
    if (!isAck(collection)) {
        return collection;
    }
    return new Promise((resolve) => {
        console.log('received ack. waiting before retry')
        setTimeout(async () => {
            console.log('retry fetch')
            resolve(await fetchFromBGG(url));
        }, 1000);
    });
}

function chunking(ids, size) {
    const result = [];
    for (let i = 0; i < ids.length; i += size) {
        result.push(ids.slice(i, i + size));
    }
    return result;
}

function isAck(obj) {
    return obj.message?.trim() === 'Your request for this collection has been accepted and will be processed.  Please try again later for access.';
}

// fetch collection
const collection = await fetchFromBGG(`collection?username=${username}&own=1`);

const ids = collection.items.item.map(i => i.objectid);
const chunks = chunking(ids, 20);

const details = [];
for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const detail = await fetchFromBGG(`thing?stats=1&id=${chunk.join(',')}`);
    details.push(...detail.items.item);
}

const links = {};
details.forEach(d => {
    if (!d.link) {
        return;
    }
    const linksArray = Array.isArray(d.link) ? d.link : [d.link];
    linksArray.forEach(l => {
        if (!links[l.type]) {
            links[l.type] = {};
        }
        if (!links[l.type][l.id]) {
            links[l.type][l.id] = {
                value: l.value,
                amount: 1,
            }
        } else {
            links[l.type][l.id].amount++
        }
    });
});

const distinct = {};
Object.entries(links).forEach(([category, ls]) => {
    Object.entries(ls).forEach(([id, {value, amount}]) => {
        if ([
            'boardgamecategory',
            'boardgamemechanic',
            // 'boardgamefamily', // keep only the relevant categories
        ].includes(category)) {
            distinct[value] = (distinct[value] ?? 0) + amount;
        }
    })
})

const sortedDistinct = Object.fromEntries(
    Object.entries(distinct)
        .sort((a, b) => {
            if (b[1] !== a[1]) {
                return b[1] - a[1];
            }
            return a[0].localeCompare(b[0]);
        })
);

details.sort((a, b) =>
    (b.statistics?.ratings?.bayesaverage?.value ?? -Infinity) -
    (a.statistics?.ratings?.bayesaverage?.value ?? -Infinity)
);

// migrated mapping from react-app
// todo: cleanup in frontend
const Weight = {
  1: 'Leicht',
  2: 'Mittel',
  3: 'Komplex',
  4: 'Schwer',
  5: 'Brutal',
}

const collection = details;
const links = sortedDistinct;

const items = collection
.filter(i => i.type === 'boardgame')
.map((i) => {
  const bestWith = i["poll-summary"].result.find(p => p.name === 'bestwith');
  const value = bestWith?.value || '';
  const best = [...value.match(/(\d\+|\d+-\d+|\d+)/g) || []];
  const bestPlayers = best.join(', ');
  const names = Array.isArray(i.name) ? i.name : [i.name];
  const tagSet = new Set(
    (i.link || [])
      .filter(l => ['boardgamecategory','boardgamemechanic'].includes(l.type))
      .map(l => l.value)
  );
  return ({
    id: i.id,
    externalSrc: `https://boardgamegeek.com/boardgame/${i.id}/`,
    rating: i.statistics.ratings.bayesaverage.value,
    name: names[0]?.value, // todo: first is probably always primary?
    year: i.yearpublished.value,
    backgroundImage: i.image, // thumbnail | image
    thumbnail: i.thumbnail, // thumbnail | image
    minPlayers: i.minplayers.value,
    maxPlayers: i.maxplayers.value,
    bestPlayers_raw: best,
    bestPlayers_numeric: best.flatMap(b => {
      if (b.endsWith('+')) {
        return [Number(b.slice(0, -1)), 99];
      }
      if (b.includes('-')) {
        const [start, end] = b.match(/\d+/g)!.map(Number);
        const arr = [];
        for (let j = start; j <= end; j++) arr.push(j);
        return arr;
      }
      return [Number(b)];
    }),
    bestPlayers: bestPlayers,
    weight_raw: i.statistics.ratings.averageweight.value,
    weight: Weight[Math.round(i.statistics.ratings.averageweight.value)],
    caption: '',
    tags: Array.from(tagSet)
      .sort((a, b) => (links[b] || 0) - (links[a] || 0))
      .slice(0, 6),
    links: i.link
  });
})

// save collection
fs.writeFileSync('./public/collection-owned_raw.json', JSON.stringify(collection, null, 4), 'utf8');
fs.writeFileSync('./public/collection.json', JSON.stringify(details, null, 4), 'utf8');
fs.writeFileSync('./public/links.json', JSON.stringify(sortedDistinct, null, 4), 'utf8');

fs.writeFileSync('./public/gamewall.json', JSON.stringify(items, null, 4), 'utf8');
