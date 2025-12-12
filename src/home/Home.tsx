import React from 'react';
import {Collection, Item, Links, Rank, Weight} from "../game.types";
import {Filters} from "./Filters";
import {Category} from "./Category";
import {
  selectAllGames,
  selectPartyGames,
  selectSocialDeductionGames,
  selectSoloAndCoOpGames,
  SortByOptions
} from "./SortingFactory";
import {useCollectionContext, useLinksContext} from "../Context";

// gamewall.github.io/collection.json
export function Home() {
  const collection: Collection = useCollectionContext();
  const links: Links = useLinksContext();

  const items: Item[] = collection.map((i) => {
    const bestWith = i["poll-summary"].result.find(p => p.name === 'bestwith');
    const value = bestWith?.value || '';
    const best = [...value.match(/(\d\+|\d+-\d+|\d+)/g) || []];
    const bestPlayers = best.join(', ');
    return ({
      id: i.id,
      externalSrc: `https://boardgamegeek.com/boardgame/${i.id}/`,
      rating: ((i.statistics.ratings.ranks.rank as Rank)?.value || (i.statistics.ratings.ranks.rank as Rank[])?.[0].value) as number,
      name: i.name[0].value, // todo: first is probably always primary?
      year: i.yearpublished.value,
      backgroundImage: i.image, // thumbnail | image
      thumbnail: i.thumbnail, // thumbnail | image
      minPlayers: i.minplayers.value,
      maxPlayers: i.maxplayers.value,
      bestPlayers_raw: best,
      bestPlayers_numeric: best.flatMap(b => {
        if (b.endsWith('+')) {
          return [Number(b.substring(0, b.length - 1)), 99];
        }
        if (b.includes('-')) {
          const n = b.match(/\d+/g) || [];
          const arr = [];
          for (let j = Number(n[0]); j <= Number(n[1]); j++) {
            arr.push(j);
          }
          return arr;
        }
        return Number(b);
      }),
      bestPlayers: bestPlayers,
      weight_raw: i.statistics.ratings.averageweight.value,
      weight: Weight[Math.round(i.statistics.ratings.averageweight.value)],
      caption: '',
      tags: i.link
        .filter(l => ['boardgamecategory', 'boardgamemechanic'].includes(l.type))
        .reduce((set: string[], l) => {
          if (!set.includes(l.value)) {
            set.push(l.value);
          }
          return set;
        }, [])
        .sort((l1, l2) => links[l2] - links[l1])
        .slice(0, 6)
      , links: i.link
    });
  })

  return (
    <>
      <Category
        title={'Meine Spiele'}
        items={selectAllGames(items)}
      />
      <Filters
        options={SortByOptions}
        items={items}
      />
      <Category
        title={'Partyspiele'}
        items={selectPartyGames(items)}
      />
      <Category
        title={'Solo & Co-Op'}
        items={selectSoloAndCoOpGames(items)}
      />
      <Category
        title={'Deduktion'}
        items={selectSocialDeductionGames(items)}
      />
    </>
  );
}
