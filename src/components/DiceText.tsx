import React, { useState } from "react";
import panelStyles from "./style/Panel.module.css"

type DiceTextProps = {
  text: string;
};

export function DiceText({ text }: DiceTextProps) {
  const [rolls, setRolls] = useState<Record<number, number>>({});

  const rollDice = (notation: string): number => {
    const [countStr, sidesStr] = notation.toLowerCase().split("d");
    const count = parseInt(countStr, 10);
    const sides = parseInt(sidesStr, 10);
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
  };

  const parts: React.ReactNode[] = [];
  const regex = /\[([0-9]+d[0-9]+)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) != null) {
    const [fullMatch, diceNotation] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push(
        <span key={`text-${index}`}>{text.slice(lastIndex, index)}</span>,
      );
    }

    const result = rolls[index];

    parts.push(
      <button
        key={`button-${index}`}
        className={panelStyles["ink-dice-button"]}
        onClick={() => {
          setRolls((prev) => ({
            ...prev,
            [index]: rollDice(diceNotation),
          }));
        }}
      >
        {diceNotation} {result != null ? `(${result})` : ""}
      </button>,
    );

    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key="end">{text.slice(lastIndex)}</span>);
  }

  return <span>{parts}</span>;
}
