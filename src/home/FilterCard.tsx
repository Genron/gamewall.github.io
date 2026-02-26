import {Item} from "../game.types";
import {Card, CardMedia} from "@rmwc/card";
import {Badge, BadgeAnchor, CardPrimaryAction} from "rmwc";
import {Typography} from "@rmwc/typography";
import React from "react";
import {BadgeStyles, getPlayerRecommendation} from "./CategoryCard";
import {IsNew, IsPreordered} from "./SortingFactory";

export function FilterCard({index, item, w}: { index: number; item: Item; w: number; }) {
  const Card = w < 900 ? (
    <ReducedCard index={index} item={item}/>
  ) : (
    <DetailedCard index={index} item={item}/>
  );
  if (IsPreordered(item)) {
    return (
      <BadgeAnchor>
        {Card}
        <Badge label={"bestellt"} theme={['primaryBg']} style={BadgeStyles(true)}/>
      </BadgeAnchor>
    );
  }
  if (IsNew(item)) {
    return (
      <BadgeAnchor>
        {Card}
        <Badge label={"neu"} theme={['secondaryBg']} style={BadgeStyles(true)}/>
      </BadgeAnchor>
    );
  }
  return Card;
}

function ReducedCard({index, item}: { index: number, item: Item }) {
  return (
    <Card className={'filter-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')}>
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
            className={'max-row-2'}
          >
            {item.name} ({item.year})
          </Typography>
          <Typography
            use="subtitle2"
            tag="div"
            theme="textSecondaryOnBackground"
            className={'max-row-1'}
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
    <Card className={'filter-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')}>
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
            className={'max-row-2'}
          >
            {item.name} ({item.year})
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
