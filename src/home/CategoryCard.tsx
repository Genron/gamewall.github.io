import {Item} from "../game.types";
import {Card, CardMedia} from "@rmwc/card";
import {Badge, BadgeAnchor, CardActions, CardPrimaryAction, Chip, ChipSet} from "rmwc";
import {Typography} from "@rmwc/typography";
import React from "react";

export function CategoryCard({item, w}: { item: Item, w: number }) {
  const Card = w < 500 ? (
    <ReducedCard item={item}/>
  ) : (
    <DetailedCard item={item}/>
  );
  if (item.status.preordered) {
    return (
      <BadgeAnchor>
        {Card}
        <Badge label={"preordered"} style={{
          fontSize: '0.55rem',
          padding: '0 0.4rem',
          margin: '0 0.2rem 0.2rem 0',
          height: 'unset',
        }}/>
      </BadgeAnchor>
    );
  }
  if (isWithinRange(new Date(item.status.lastmodified), 90)) {
    return (
      <BadgeAnchor>
        {Card}
        <Badge label={"new"} style={{
          fontSize: '0.55rem',
          padding: '0 0.4rem',
          margin: '0 0.2rem 0.2rem 0',
          height: 'unset',
        }}/>
      </BadgeAnchor>
    );
  }
  return Card;
}

function ReducedCard({item}: { item: Item }) {
  return (
    <Card className={'category-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')}>
      <CardPrimaryAction>
        <CardMedia
          square
          style={{
            backgroundImage: `url("${item.thumbnail}")`,
          }}
        />
        <div style={{padding: '0 1rem 1rem 1rem'}}>
          <Typography use="body1" tag="h2" className={'max-row-3'}>
            {item.name} ({item.year})
          </Typography>
          <Typography
            use="caption"
            tag="h3"
            theme="textSecondaryOnBackground"
            style={{
              margin: '-0.8rem 0 0', display: 'flex', justifyContent: 'space-between'
            }}
          >
            <span>{getPlayerRecommendation(item)}</span>
            <span>{item.weight}</span>
          </Typography>
        </div>
      </CardPrimaryAction>
    </Card>
  );
}

export function getPlayerRecommendation(item: Item) {
  if (item.minPlayers === item.maxPlayers) {
    return item.minPlayers;
  }
  return `${item.minPlayers}-${item.maxPlayers} (${item.bestPlayers})`;
}

function DetailedCard({item}: { item: Item }) {
  return (
    <Card className={'category-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')}>
      <CardPrimaryAction>
        <CardMedia
          square
          style={{
            backgroundImage: `url("${item.backgroundImage}")`,
            backgroundSize: 'contain',
          }}
        >
        </CardMedia>
        <div style={{padding: '0 1rem 0 1rem'}}>
          <Typography use="headline6" tag="h2" className={'max-row-2'}>
            {item.name} ({item.year})
          </Typography>
          <Typography
            use="subtitle2"
            tag="h3"
            theme="textSecondaryOnBackground"
            style={{
              marginTop: '-1rem', display: 'flex', justifyContent: 'space-between'
            }}
          >
            <span>Spieler {getPlayerRecommendation(item)}</span>
            <span>{item.weight}</span>
          </Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <ChipSet style={{padding: '0'}} className={'max-row-3'} choice>
          {item.tags.map(tag => (
            <Chip key={tag} label={tag}
                  style={{
                    fontSize: '0.55rem',
                    padding: '0 0.4rem',
                    margin: '0 0.2rem 0.2rem 0',
                    height: 'unset',
                  }}
            />
          ))}
        </ChipSet>
      </CardActions>
    </Card>
  );
}

export function isWithinRange(date: any, days: number) {
  const now: any = new Date();
  const diffInMs = now - date; // positive if date is in the past
  const thirtyDaysInMs = days * 24 * 60 * 60 * 1000;

  return diffInMs >= 0 && diffInMs <= thirtyDaysInMs;
}
