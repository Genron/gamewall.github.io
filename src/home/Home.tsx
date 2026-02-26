import React from 'react';
import {Collection, Links} from "../game.types";
import {Filters, OptionFilters} from "./Filters";
import {Category} from "./Category";
import {
  Options,
  PlayerFilterOptions,
  selectAllGames,
  selectNewAndPreorderedGames,
  selectPartyGames,
  selectSocialDeductionGames,
  selectSoloAndCoOpGames,
  SortByOptions
} from "./SortingFactory";
import {useCollectionContext, useLinksContext} from "../Context";

export function Home() {
  const items: Collection = useCollectionContext();
  const links: Links = useLinksContext();
  const options: Options = Object.entries(links)
    .filter(([_, value]) => value > 4)
    .map(([key, value]) => ({
      value: key,
      label: key, // todo: fix value calculation
    }));
  console.log(options);

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
        title={'Neuzugänge'}
        items={selectNewAndPreorderedGames(items)}
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
      <OptionFilters
        options={options}
        items={items}
      />
    </>
  );
}
