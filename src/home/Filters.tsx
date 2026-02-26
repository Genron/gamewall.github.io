import {Item} from "../game.types";
import React, {useLayoutEffect, useRef, useState} from "react";
import {Grid, GridCell} from "@rmwc/grid";
import {Typography} from "@rmwc/typography";
import {Chip, ChipSet, GridRow, MenuItem, SimpleMenu} from "rmwc";
import {FilterCard} from "./FilterCard";
import {Option, Options, SortBy, SortingFactory} from "./SortingFactory";

export const OptionFilters = ({options, items}: { options: Options; items: Item[]; }) => {
  const [width, setWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(e => setWidth(e[0].contentRect.width));
    observer.observe(gridRef.current as HTMLDivElement);
    return () => observer.disconnect();
  }, []);

  const [selected, setSelected] = React.useState<Option>(options[0]);

  const sortedItems = SortingFactory.get(selected)(items);

  const sorted = options.sort((o1) => o1 === selected ? -1 : 1);

  return (
    <React.Fragment>
      <section>
        <Grid fixedColumnWidth>
          <GridCell span={12}>
            <Typography use={'headline6'} tag="h2">{selected.label}</Typography>
            <ChipSet choice>
              <SimpleMenu
                onSelect={(evt) => setSelected(sorted[evt.detail.index])}
                handle={
                  <Chip className="filter-chip" theme={['primaryBg', 'onPrimary']}>
                        <span className="chip-label">{selected.label}<i
                          className="material-icons chip-arrow">keyboard_arrow_down</i></span>
                  </Chip>
                }
              >
                {sorted.map(option => (
                  <MenuItem key={'menuitem' + option.value}>{option.label}</MenuItem>
                ))}
              </SimpleMenu>
            </ChipSet>
          </GridCell>
        </Grid>
        <Grid
          ref={gridRef}
          fixedColumnWidth
          className={'scrollable-grid'}
        >
          <GridRow
            style={{
              gridTemplateColumns: `repeat(${Math.floor(sortedItems.length / 3 + 1)}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(3, minmax(0, 1fr))`,
              width: `${Math.max(width, width * (sortedItems.length / 3) * getFilterFactor(width))}px`,
            }}>
            {sortedItems.map((item, i) => (
              <GridCell key={i} span={1}>
                <FilterCard index={i + 1} item={item} w={width}/>
              </GridCell>
            ))}
          </GridRow>
        </Grid>
      </section>
    </React.Fragment>
  );
};


export const Filters = ({options, items}: { options: SortBy[][]; items: Item[]; }) => {
  const [width, setWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(e => setWidth(e[0].contentRect.width));
    observer.observe(gridRef.current as HTMLDivElement);
    return () => observer.disconnect();
  }, []);

  const [selected, setSelected] = React.useState<SortBy>(options[0][0]);

  const sortedItems = SortingFactory.get(selected)(items);

  const sorted = options.map(optionGroup => [...optionGroup].sort((o1) => o1 === selected ? -1 : 1));

  return (
    <React.Fragment>
      <section>
        <Grid fixedColumnWidth>
          <GridCell span={12}>
            <Typography use={'headline6'} tag="h2">{selected}</Typography>
            <ChipSet choice>
              {sorted.map(optionGroup => {
                const option = optionGroup[0];
                const isSelected = selected === option;
                if (optionGroup.length === 1) {
                  return (
                    <Chip
                      key={'menu' + optionGroup.join(',')}
                      selected={isSelected}
                      theme={isSelected ? ['primaryBg', 'onPrimary'] : []}
                      label={option}
                      onInteraction={() => setSelected(option)}
                    />
                  )
                }
                return (
                  <SimpleMenu
                    key={'menu' + optionGroup.join(',')}
                    onSelect={(evt) => setSelected(optionGroup[evt.detail.index])}
                    handle={
                      <Chip className="filter-chip" theme={isSelected ? ['primaryBg', 'onPrimary'] : []}>
                        <span className="chip-label">{option}<i
                          className="material-icons chip-arrow">keyboard_arrow_down</i></span>
                      </Chip>
                    }
                  >
                    {optionGroup.map((o) => (
                      <MenuItem key={'menuitem' + o}>{o}</MenuItem>
                    ))}
                  </SimpleMenu>
                );
              })}
            </ChipSet>
          </GridCell>
        </Grid>
        <Grid
          ref={gridRef}
          fixedColumnWidth
          className={'scrollable-grid'}
        >
          <GridRow
            style={{
              gridTemplateColumns: `repeat(${Math.floor(sortedItems.length / 3 + 1)}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(3, minmax(0, 1fr))`,
              width: `${Math.max(width, width * (sortedItems.length / 3) * getFilterFactor(width))}px`,
            }}>
            {sortedItems.map((item, i) => (
              <GridCell key={i} span={1}>
                <FilterCard index={i + 1} item={item} w={width}/>
              </GridCell>
            ))}
          </GridRow>
        </Grid>
      </section>
    </React.Fragment>
  );
};

function getFilterFactor(w: number) {
  if (w < 500) {
    return 1.1;
  }
  if (w < 1000) {
    return 0.545;
  }
  return 0.365;
}
