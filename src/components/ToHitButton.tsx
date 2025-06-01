import { useState, type CSSProperties } from "react";

type ToHitButtonProps = {
  text: string;
  toHit: number;
};

const diceButtonStyle: CSSProperties = {
  marginLeft: "4px",
  minWidth: "0px",
};

export function ToHitButton(props: ToHitButtonProps) {
  const [result, setResult] = useState<number | undefined>();

  const rollDice = (): number => {
    return Math.floor(Math.random() * 20) + 1 + props.toHit;
  };

  return (
    <button
      key="button"
      style={diceButtonStyle}
      onClick={() => {
        setResult(rollDice());
      }}
    >
      {props.text} {result != null ? `(${result})` : ""}
    </button>
  );
}
