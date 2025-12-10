import {Item} from "../game.types";
import React, {useLayoutEffect, useRef, useState} from "react";
import {Grid, GridCell} from "@rmwc/grid";
import {Typography} from "@rmwc/typography";
import {GridRow} from "rmwc";
import {CategoryCard} from "./CategoryCard";

export const Category = ({title, items}: { title: string; items: Item[]; }) => {
  const [width, setWidth] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(e => setWidth(e[0].contentRect.width));
    observer.observe(gridRef.current as HTMLDivElement);
    return () => observer.disconnect();
  }, []);

  return (
    <React.Fragment>
      <section>
        <Grid fixedColumnWidth>
          <GridCell>
            <Typography use={'headline6'} tag="h2">{title}</Typography>
          </GridCell>
        </Grid>
        <Grid
          ref={gridRef}
          fixedColumnWidth
          className={'scrollable-grid'}
        >
          <GridRow
            style={{
              gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
              width: `${width * items.length * getFactor(width)}px`,
            }}>
            {items.map((item, i) => (
              <GridCell key={i} span={1}>
                <CategoryCard item={item} w={width}/>
              </GridCell>
            ))}
          </GridRow>
        </Grid>
      </section>
    </React.Fragment>
  );
};

function getFactor(w: number) {
  if (w < 500) {
    return 0.51;
  }
  if (w < 1000) {
    // return 0.335;
    return 0.362;
  }
  // return 0.2005;
  return 0.228;
}
