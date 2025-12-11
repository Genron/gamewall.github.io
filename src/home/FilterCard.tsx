import {Item} from "../game.types";
import {Card, CardMedia} from "@rmwc/card";
import {CardPrimaryAction} from "rmwc";
import {Typography} from "@rmwc/typography";
import React from "react";
import {buildTitle, getPlayerRecommendation} from "./CategoryCard";

export function FilterCard({index, item, w}: { index: number; item: Item; w: number; }) {
  return w < 500 ? (
    <ReducedCard index={index} item={item}/>
  ) : (
    <DetailedCard index={index} item={item}/>
  );
}

function ReducedCard({index, item}: { index: number, item: Item }) {
  return (
    <Card className={'filter-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')} >
      <CardPrimaryAction style={{flexDirection: 'row', alignItems: 'center'}}>
        <Typography use="body1" tag="h2" style={{padding: '0 1rem 0 1.5rem'}}>
          {index}
        </Typography>
        <CardMedia
          square
          style={{
            width: '6rem',
            height: '6rem',
            backgroundImage: `url("${item.thumbnail}")`,
            backgroundSize: 'contain',
          }}
        >
        </CardMedia>
        <div style={{padding: '0 1.5rem 0 1rem', flex: '1 1 0'}}>
          <Typography
            use="body1"
            tag="div"
            theme="textSecondaryOnBackground"
          >
            {buildTitle(item.name, item.year, 24)}
          </Typography>
          <Typography
            use="subtitle2"
            tag="div"
            theme="textSecondaryOnBackground"
          >
            Spieler {getPlayerRecommendation(item)}
          </Typography>
          <Typography
            use="subtitle2"
            tag="div"
            theme="textSecondaryOnBackground"
          >
            {item.weight}
          </Typography>
        </div>
      </CardPrimaryAction>
    </Card>
  );
}

function DetailedCard({index, item}: { index: number, item: Item }) {
  return (
    <Card className={'filter-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')} >
      <CardPrimaryAction style={{flexDirection: 'row', alignItems: 'center'}}>
        <Typography use="body1" tag="h2" style={{padding: '0 1rem 0 1.5rem'}}>
          {index}
        </Typography>
        <CardMedia
          square
          style={{
            width: '6rem',
            height: '6rem',
            backgroundImage: `url("${item.thumbnail}")`,
            backgroundSize: 'contain',
          }}
        >
        </CardMedia>
        <div style={{padding: '0 1.5rem 0 1rem', flex: '1 1 0'}}>
          <Typography
            use="body1"
            tag="div"
            theme="textSecondaryOnBackground"
          >
            {buildTitle(item.name, item.year, 39)}
          </Typography>
          <Typography
            use="subtitle2"
            tag="div"
            theme="textSecondaryOnBackground"
          >
            Spieler {getPlayerRecommendation(item)}
          </Typography>
          <Typography
            use="subtitle2"
            tag="div"
            theme="textSecondaryOnBackground"
          >
            {item.weight}
          </Typography>
        </div>
      </CardPrimaryAction>
    </Card>
  );
}
