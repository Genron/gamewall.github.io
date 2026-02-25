import React from 'react';
import {Collection} from "../game.types";
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
import {useCollectionContext} from "../Context";

export function Home() {
  const items: Collection = useCollectionContext();
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
