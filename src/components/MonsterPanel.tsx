import "98.css";
import type { CSSProperties } from "react";
import { DiceText } from "./DiceText";
import type { Monster } from "../models/monster";

export type MonsterPanelProps = {
  monster: Monster;
  closeCallback?: () => void;
};

export function MonsterPanel({ monster, closeCallback }: MonsterPanelProps) {
  const bonusToString = (toHit: number) => {
    return toHit >= 0 ? `+${toHit}` : `${toHit}`;
  };

  return (
    <div className="window" style={windowStyle}>
      <div className="title-bar">
        <div className="title-bar-text">Monster: {monster.name}</div>
        <div className="title-bar-controls">
          <button
            aria-label="Close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={closeCallback}
          />
        </div>
      </div>

      <div className="window-body" style={windowBodyStyle}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>HP:</strong> <span>{monster.hp}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>AC:</strong> <span>{monster.ac}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>MV:</strong> <span>{monster.movement}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>AL:</strong> <span>{monster.alignment}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>LV:</strong> <span>{monster.level}</span>
          </p>
        </div>

        <hr></hr>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>Strength:</strong>{" "}
            <span>{bonusToString(monster.stats.strength)}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>Dexterity:</strong>{" "}
            <span>{bonusToString(monster.stats.dexterity)}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>Constitution:</strong>{" "}
            <span>{bonusToString(monster.stats.constitution)}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>Intelligence:</strong>{" "}
            <span>{bonusToString(monster.stats.intelligence)}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>Wisdom:</strong>{" "}
            <span>{bonusToString(monster.stats.wisdom)}</span>
          </p>
          <p style={{ margin: 0, lineHeight: "1.2" }}>
            <strong>Charisma:</strong>{" "}
            <span>{bonusToString(monster.stats.charisma)}</span>
          </p>
        </div>

        <hr></hr>

        <p>
          <strong>Attacks</strong>
        </p>
        <ul>
          {monster.attacks.map((a) => {
            return (
              <li key={a.name}>
                {a.perRound} {a.name} {a.range != null ? `(${a.range})` : ``}{" "}
                {bonusToString(a.toHit ?? 0)}{" "}
                {<DiceText text={a.description}></DiceText>}
              </li>
            );
          })}
        </ul>

        {monster.abilities != null && monster.abilities.length > 0 && (
          <p>
            <strong>Abilities</strong>
          </p>
        )}
        <ul>
          {monster.abilities?.map((a) => {
            return (
              <li key={a.name}>
                {a.name}: {<DiceText text={a.description}></DiceText>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const windowStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const windowBodyStyle: CSSProperties = {
  overflow: "auto",
  height: "calc(100% - 30px)",
  paddingRight: "0.5rem",
};
