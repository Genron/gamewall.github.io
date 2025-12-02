import React, {useEffect, useState} from 'react';
import {Game, Weight} from "./generated/game.types";
import '@rmwc/elevation/styles';
import { Elevation } from "@rmwc/elevation";

function mapPlayers(playersStr: string | number): string {
  const playersNum = ('' + playersStr).split(',')
    .map(Number)
    .sort((a, b) => a - b)
    .filter(a => !!a)
  ;
  console.log(playersNum);
  let result = '';
  let beginQueue = playersNum[0];
  let lastNumber = playersNum[0];

  for (let i = 1; i < playersNum.length; i++) {
    const currentPlayer = playersNum[i];
    if (currentPlayer - lastNumber === 1) {
      lastNumber = currentPlayer;
    } else {
      if (lastNumber === beginQueue) {
        result += `${beginQueue}, `;
      } else {
        result += `${beginQueue} - ${lastNumber}, `;
      }
      beginQueue = currentPlayer;
      lastNumber = currentPlayer;
    }
  }

  if (result.endsWith(`${beginQueue}, `)) {
    result = result.substring(0, result.length - 2);
  } else if (lastNumber === beginQueue) {
    result += `${beginQueue}`;
  } else {
    result += `${beginQueue} - ${lastNumber}`;
  }

  return result;
}

function Card({game}: { game: Game }) {
  return (
    <div style={{
      // boxShadow: '5px 5px 5px rgba(255, 255, 255 ,0.2)',
      padding: '20px 40px',
    }}>
      <span>{game.objectname} ({game.yearpublished})</span>
      <br/>
      <span>{Weight[Math.round(game.avgweight)]}</span>
      <br/>
      <span>{game.minplayers} - {game.maxplayers} Spieler</span>
      <br/>
      <span>Community: {mapPlayers(game.bggrecplayers)}, Best: {mapPlayers(game.bggbestplayers)}</span>
      <br/>
      <span>{mapPlayers(`${game.minplaytime},${game.maxplaytime}`)} min</span>
      <br/>
      <span>{game.bggrecagerange}</span>
    </div>
  );
}

const ByWeight = (a: Game, b: Game): number => b.avgweight - a.avgweight;
const ByPlayers = (a: Game, b: Game): number => {
  const bstrs = ('' + b.bggbestplayers).split(',').map(Number);
  const astrs = ('' + a.bggbestplayers).split(',').map(Number);
  return bstrs[bstrs.length - 1] - astrs[astrs.length - 1];
};
const ByDuration = (a: Game, b: Game): number => {
  return Math.max(b.minplaytime, b.maxplaytime, b.playingtime) - Math.max(a.minplaytime, a.maxplaytime, a.playingtime);
};


function App() {

  const [state, setState] = useState<any[]>([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/info_csv.json')
      .then(res => res.json())
      .then(setState);
  }, []);

  return (
    <>
      <>
        {Array(25)
          .fill(undefined)
          .map((val, i) => (
            <Elevation z={i} key={i}>
              {i}dp
            </Elevation>
          ))}
      </>
      <div className="App">
        <header className="App-header"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}>
          {state
            .sort(ByWeight)
            .sort(ByDuration)
            .sort(ByPlayers)
            .map((item, index) => (
              <Card key={item.objectid} game={item}/>
            ))}
        </header>
      </div>
    </>
  );
}

export default App;
