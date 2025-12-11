import {Item} from "../game.types";
import {Card, CardMedia} from "@rmwc/card";
import {CardActions, CardPrimaryAction, Chip, ChipSet} from "rmwc";
import {Typography} from "@rmwc/typography";
import React from "react";

export function CategoryCard({item, w}: { item: Item, w: number }) {
  return w < 500 ? (
    <ReducedCard item={item}/>
  ) : (
    <DetailedCard item={item}/>
  );
}

function ReducedCard({item}: { item: Item }) {
  return (
    <Card className={'category-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')} >
      <CardPrimaryAction>
        <CardMedia
          square
          style={{
            backgroundImage: `url("${item.thumbnail}")`,
          }}
        />
        <div style={{padding: '0 1rem 1rem 1rem'}}>
          <Typography use="body1" tag="h2">
            {buildTitle(item.name, item.year, 23)}
          </Typography>
          <Typography
            use="caption"
            tag="h3"
            theme="textSecondaryOnBackground"
            style={{
              marginTop: '-1rem', display: 'flex', justifyContent: 'space-between'
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

export function buildTitle(name: string, year: number, maxLen: number): string {
  const title = `${name} (${year})`;
  if (title.length < maxLen) {
    return title;
  }
  if (name.length < maxLen) {
    return name;
  }
  if (name.length < (maxLen + 7)) {
    return name.substring(0, maxLen);
  }
  return title.substring(0, maxLen);
}

export function getPlayerRecommendation(item: Item) {
  if (item.minPlayers === item.maxPlayers) {
    return item.minPlayers;
  }
  return `${item.minPlayers}-${item.maxPlayers} (${item.bestPlayers})`;
}

function DetailedCard({item}: { item: Item }) {
  return (
    <Card className={'category-card'} onClick={() => window.open(item.externalSrc, '_blank', 'noopener noreferrer')} >
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
          <Typography use="headline6" tag="h2">
            {buildTitle(item.name, item.year, 37)}
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
        <ChipSet style={{ padding: '0' }}>
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
