export const Weight1: { [key: number]: string } = {
  1: 'Sehr Leicht',
  2: 'Leicht',
  3: 'Mittel',
  4: 'Schwer',
  5: 'Sehr Schwer',
}
export const Weight: { [key: number]: string } = {
  1: 'Leicht',
  2: 'Mittel',
  3: 'Komplex',
  4: 'Schwer',
  5: 'Brutal',
}

export interface Game {
  objectname: string
  objectid: number
  rating: number
  numplays: number
  weight: number
  own: number
  fortrade: number
  want: number
  wanttobuy: number
  wanttoplay: number
  prevowned: number
  preordered: number
  wishlist: number
  wishlistpriority: number
  collid: number
  baverage: number
  average: number
  avgweight: number
  rank: number
  numowned: number
  objecttype: string
  originalname: string
  minplayers: number
  maxplayers: number
  playingtime: number
  maxplaytime: number
  minplaytime: number
  yearpublished: number
  bggrecplayers: string
  bggbestplayers: string
  bggrecagerange: string
  bgglanguagedependence: string
  itemtype: string
}

export interface Item {
  rating: number;
  backgroundImage: string;
  thumbnail: string;
  name: string;
  year: number;
  minPlayers: number;
  maxPlayers: number;
  bestPlayers_numeric: number[];
  bestPlayers_raw: string[];
  bestPlayers: string;
  weight_raw: number;
  weight: string;
  caption: string;
  tags: string[];
  links: Array<{
    type: string;
    id: number;
    value: string;
    inbound?: boolean;
  }>
}

export type LinkType =
  'boardgamefamily'
  | 'boardgamemechanic'
  | 'boardgamecategory'
  | 'boardgamepublisher'
  | 'boardgameartist'
  | 'boardgamedesigner'
  | 'boardgamecompilation'
  | 'boardgameintegration'
  | 'boardgameexpansion'
  ;

export type Links = {
  [key: string]: number
};
export type Links1 = {
  boardgamecategory: SimpleLink
  boardgamemechanic: SimpleLink
  boardgamefamily: SimpleLink
  boardgameexpansion: SimpleLink
  boardgameaccessory: SimpleLink
  boardgameintegration: SimpleLink
  boardgamecompilation: SimpleLink
  boardgameimplementation: SimpleLink
  boardgamedesigner: SimpleLink
  boardgameartist: SimpleLink
  boardgamepublisher: SimpleLink
};

export type SimpleLink = {
  [id: number]: {
    value: string
    amount: number
  },
}

export type Link = {
  "type": LinkType
  "id": number
  "value": string
  "inbound"?: boolean
};

export type Collection = Array<{
  "type": string,
  "id": number,
  "thumbnail": string,
  "image": string,
  "name": Array<{
    "type": string,
    "sortindex": number,
    "value": string
  }>,
  "description": string,
  "yearpublished": {
    "value": number
  },
  "minplayers": {
    "value": number
  },
  "maxplayers": {
    "value": number
  },
  "poll": Array<{
    "name": string,
    "title": string,
    "totalvotes": number,
    "results": Array<{
      "numplayers"?: number | string,
      "result": Array<{
        "level"?: number,
        "value": string | number, // todo?
        "numvotes": number
      }>
    }> | {
      "numplayers"?: number | string,
      "result": Array<{
        "level"?: number,
        "value": string | number, // todo?
        "numvotes": number
      }>
    }
  }>,
  "poll-summary": {
    "name": string,
    "title": string
    "result": Array<{
      "name": string
      "value": string
    }>
  },
  "playingtime": {
    "value": number
  },
  "minplaytime": {
    "value": number
  },
  "maxplaytime": {
    "value": number
  },
  "minage": {
    "value": number
  },
  "link": Array<Link>
  "statistics": {
    "page": number,
    "ratings": {
      "usersrated": {
        "value": number
      },
      "average": {
        "value": number
      },
      "bayesaverage": {
        "value": number
      },
      "ranks": {
        "rank": Array<{
          "type": string,
          "id": number,
          "name": string,
          "friendlyname": string,
          "value": number | string, // not ranked
          "bayesaverage": number
        }> | {
          "type": string,
          "id": number,
          "name": string,
          "friendlyname": string,
          "value": number | string, // not ranked
          "bayesaverage": number
        }
      },
      "stddev": {
        "value": number
      },
      "median": {
        "value": number
      },
      "owned": {
        "value": number
      },
      "trading": {
        "value": number
      },
      "wanting": {
        "value": number
      },
      "wishing": {
        "value": number
      },
      "numcomments": {
        "value": number
      },
      "numweights": {
        "value": number
      },
      "averageweight": {
        "value": number
      }
    }
  }
}>

