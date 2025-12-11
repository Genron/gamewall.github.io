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
        return {
            ...e,
            [key]: mapToNumbers(value),
        };
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

function chunking(ids, maxSize) {
    const result = [];
    for (let i = 0; i < ids.length; i++) {
        if (result[result.length - 1] === undefined) {
            result.push([ids[i]]);
        } else {
            if (result[result.length - 1].length === maxSize) {
                result.push([ids[i]]);
            } else {
                result[result.length - 1].push(ids[i]);
            }
        }
    }
    return result;
}

function isAck(obj) {
    return obj.message?.trim() === 'Your request for this collection has been accepted and will be processed.  Please try again later for access.';
}

// fetch collection
const collection = await fetchFromBGG(`collection?username=${username}&own=1`);

fs.writeFileSync('./public/user_collection.json', JSON.stringify(collection, null, 4), 'utf8');

const ids = collection.items.item.map(i => i.objectid);
const chunks = chunking(ids, 20);

const details = [];
for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const detail = await fetchFromBGG(`thing?stats=1&id=${chunk.join(',')}`);
    details.push(...detail.items.item);
}

const links = {};
details.forEach(d => d.link.forEach(l => {
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
}))

const distinct = {};
Object.entries(links).forEach(([category, ls]) => {
    Object.entries(ls).forEach(([id, {value, amount}]) => {
        if ([
            'boardgamecategory',
            'boardgamemechanic',
            // 'boardgamefamily', // keep only the relevant categories
        ].includes(category)) {
            if (!distinct[value]) {
                distinct[value] = amount;
            } else {
                distinct[value] += amount;
            }
        }
    })
})

fs.writeFileSync('./public/collection.json', JSON.stringify(details, null, 4), 'utf8');
fs.writeFileSync('./public/links.json', JSON.stringify(links, null, 4), 'utf8');
fs.writeFileSync('./public/sortedlinks.json', JSON.stringify(distinct, null, 4), 'utf8');
