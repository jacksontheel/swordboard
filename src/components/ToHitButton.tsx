import { useState } from "react";
import panelStyles from "./style/Panel.module.css"

type ToHitButtonProps = {
  text: string;
  toHit: number;
};

export function ToHitButton({ text, toHit }: ToHitButtonProps) {
  const [result, setResult] = useState<number | undefined>();

  const rollDice = (): number => {
    return Math.floor(Math.random() * 20) + 1 + toHit;
  };

  return (
    <button
      className={panelStyles["ink-dice-button"]}
      onClick={() => {
        setResult(rollDice());
      }}
    >
      {text} {result != null ? `(${result})` : ""}
    </button>
  );
}
