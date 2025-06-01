export type Monster = {
  name: string;
  type: "monster";
  ac: string;
  hp: string;
  movement: string;
  level: number;
  stats: Stats;
  alignment: Alignment;
  attacks: Attack[];
  abilities?: Ability[];
};

export type Attack = {
  name: string;
  perRound: number;
  range?: string;
  toHit?: number;
  description?: DiceString;
};

export type Ability = {
  name: string;
  description: DiceString;
};

export type Stats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Alignment = "Lawful" | "Neutral" | "Chaotic";

export type DiceString = string;
