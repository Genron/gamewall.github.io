import {Item} from "../game.types";

export enum SortBy {
  GlobalRating = 'Beste Bewertung',
  MinPlayers = 'Spieler (min)',
  MaxPlayers = 'Spieler (max)',
  WeightMin = 'Schwierigkeit (min)',
  WeightMax = 'Schwierigkeit (max)',
  Solo = 'Solo',
  CoOp = 'Co-Op',
  TwoPlayer = '2 Spieler',
  ThreePlayer = '3 Spieler',
  FourPlayer = '4 Spieler',
  FivePlayer = '5 Spieler',
  SixPlusPlayer = '6+ Spieler',
}

export const SortByOptions: SortBy[][] = [
  [SortBy.WeightMax,
    SortBy.WeightMin,],
  [SortBy.MinPlayers,
    SortBy.MaxPlayers,],
  [SortBy.GlobalRating,],
];

export const PlayerFilterOptions: SortBy[][] = [
  [SortBy.Solo],
  [SortBy.TwoPlayer],
  [SortBy.ThreePlayer],
  [SortBy.FourPlayer],
  [SortBy.FivePlayer],
  [SortBy.SixPlusPlayer],
];

const copy = (items: Item[]): Item[] => items.concat([]);

const ByMaxPlayers = (i1: Item, i2: Item): number => {
  const n = i2.maxPlayers - i1.maxPlayers;
  if (n === 0) {
    return i2.minPlayers - i1.minPlayers;
  }
  return n;
};

const ByMinPlayers = (i1: Item, i2: Item): number => {
  const n = i1.minPlayers - i2.minPlayers;
  if (n === 0) {
    return i1.maxPlayers - i2.maxPlayers;
  }
  return n;
};

const ByWeightMin = (i1: Item, i2: Item): number => {
  return i1.weight_raw - i2.weight_raw;
};

const ByWeightMax = (i1: Item, i2: Item): number => {
  return i2.weight_raw - i1.weight_raw;
};

const IsSolo = (i1: Item): boolean => {
  return !!i1.links.find(l => l.id === 2819);
}

const ByBestPlayerMin = (i1: Item, i2: Item): number => {
  return i1.bestPlayers_numeric[0] - i2.bestPlayers_numeric[0];
};

const ByPreorderedFirst = (i1: Item, i2: Item): number => {
  const i1True = IsPreordered(i1);
  const i2True = IsPreordered(i2);
  if ((i1True && i2True) || (!i1True && !i2True)) {
    return 0;
  }
  return i1True ? -1 : 1;
};

const IsCoOp = (i1: Item): boolean => {
  return !!i1.links.find(l => l.id === 2023);
};

const IsPlayerCount = (n: number) => (i1: Item): boolean => {
  return i1.bestPlayers_numeric.includes(n);
};

export const IsNew = (i1: Item): boolean => {
  const days = 90;
  const daysInMs = days * 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const date = new Date(i1.status.lastmodified).getTime();
  const diffInMs = now - date; // positive if date is in the past
  return diffInMs >= 0 && diffInMs <= daysInMs;
};

export const IsPreordered = (i1: Item): boolean => {
  return !!i1.status.preordered;
};

export const SortingFactory = {
  get(o: SortBy): (items: Item[]) => Item[] {
    switch (o) {
      case SortBy.GlobalRating:
        return (items: Item[]) => items;
      case SortBy.MaxPlayers:
        return (items: Item[]) => {
          return copy(items).sort(ByMaxPlayers);
        };
      case SortBy.MinPlayers:
        return (items: Item[]) => {
          return copy(items).sort(ByMinPlayers);
        };
      case SortBy.WeightMin:
        return (items: Item[]) => {
          return copy(items).sort(ByWeightMin);
        };
      case SortBy.WeightMax:
        return (items: Item[]) => {
          return copy(items).sort(ByWeightMax);
        };
      case SortBy.Solo:
        // 2819, // Solo / Solitaire Game
        return (items: Item[]) => {
          return copy(items)
            .filter(IsSolo)
            .sort(ByBestPlayerMin);
        };
      case SortBy.CoOp:
        return (items: Item[]) => {
          return copy(items)
            .filter(IsCoOp);
        };
      case SortBy.TwoPlayer:
        return (items: Item[]) => {
          return copy(items)
            .filter(IsPlayerCount(2));
        };
      case SortBy.ThreePlayer:
        return (items: Item[]) => {
          return copy(items)
            .filter(IsPlayerCount(3));
        };
      case SortBy.FourPlayer:
        return (items: Item[]) => {
          return copy(items)
            .filter(IsPlayerCount(4));
        };
      case SortBy.FivePlayer:
        return (items: Item[]) => {
          return copy(items)
            .filter(IsPlayerCount(5));
        };
      case SortBy.SixPlusPlayer:
        return (items: Item[]) => {
          return copy(items)
            .filter(ByMaxPlayersGt(5));
        };
      default:
        throw new Error(`Unsupported type ${o}`);
    }
  }
}

const ByMaxPlayersGt = (num: number) => (i1: Item): boolean => i1.maxPlayers > num
const ByWeightLt = (num: number) => (i1: Item): boolean => i1.weight_raw < num

export function isSocialDeduction(i: Item): boolean {
  return !!i.links.find(link => {
    return !![
      1023, // Bluffing
      1039, // Deduction
      // 1040, // Murder / Mystery
      1081, // Spies / Secret Agents
      2014, // Betting and Bluffing
      2814, // Traitor Game
      2891, // Hidden Roles
      3002, // Deduction
      2989, // Game: Werewolf / Mafia
      // 11111, // Mechanism: Deduction – Blind Man's Bluff
      // 14661, // Theme: Mystery / Crime
    ].find(id => id === link.id)
  })
}

export function selectAllGames(items: Item[]): Item[] {
  return SortingFactory.get(SortBy.GlobalRating)(items);
}

export function selectPartyGames(items: Item[]): Item[] {
  return SortingFactory.get(SortBy.MaxPlayers)(items)
    .filter(and(
      ByMaxPlayersGt(6),
      ByWeightLt(2)
    ));
}

function or(...Filters: Array<(i1: Item) => boolean>): (i1: Item) => boolean {
  return i => Filters.some(f => f(i));
}

function and(...Filters: Array<(i1: Item) => boolean>): (i1: Item) => boolean {
  return i => Filters.reduce((allMatch, filter) => allMatch && filter(i), true);
}

export function selectSoloAndCoOpGames(items: Item[]): Item[] {
  return copy(items)
    .filter(or(
      IsSolo,
      IsCoOp
    ))
    .sort(ByBestPlayerMin);
}

export function selectNewAndPreorderedGames(items: Item[]): Item[] {
  return copy(items)
    .filter(or(
      IsNew,
      IsPreordered
    ))
    .sort(ByPreorderedFirst);
}

export function selectSocialDeductionGames(items: Item[]): Item[] {
  return SortingFactory.get(SortBy.MaxPlayers)(items)
    .filter(isSocialDeduction);
}
