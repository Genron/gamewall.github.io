import React from 'react';
import {Collection, CollectionName, Item, Links, Rank, Weight} from "../game.types";
import {Filters} from "./Filters";
import {Category} from "./Category";
import {
  PlayerFilterOptions,
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

  const items: Item[] = collection
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

  return (
    <>
      <Category
        title={`Alle Spiele (${items.length})`}
        items={selectAllGames(items)}
      />
      <Filters
        options={SortByOptions}
        items={items}
      />
      <Category
        title={'Solo & Co-Op'}
        items={selectSoloAndCoOpGames(items)}
      />
      <Filters
        options={PlayerFilterOptions}
        items={items}
      />
      <Category
        title={'Partyspiele'}
        items={selectPartyGames(items)}
      />
      <Category
        title={'Deduktion'}
        items={selectSocialDeductionGames(items)}
      />
    </>
  );
}
