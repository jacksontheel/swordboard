import type { CSSProperties } from "react";
import type { Monster } from "../../models/monster";
import { DiceText } from "../DiceText";
import { ToHitButton } from "../ToHitButton";
import panelStyles from "../style/Panel.module.css";
import monsterStyles from "../style/Monster.module.css";

export type MonsterPanelProps = {
  monster: Monster;
  closeCallback: () => void;
};

export function MonsterPanel({ monster, closeCallback }: MonsterPanelProps) {
  const bonusToString = (toHit: number) => {
    return toHit >= 0 ? `+${toHit}` : `${toHit}`;
  };

  return (
    <div className={panelStyles["ink-panel"]} style={windowStyle}>
      <div className={`${panelStyles["ink-header"]} ink-header`}>
        <div className={panelStyles["ink-header-title"]}>
          Monster: {monster.name}
        </div>
        <div className={panelStyles["ink-header-controls"]}>
          <button
            className={panelStyles["ink-button"]}
            aria-label="Close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={closeCallback}
          >
            ✕
          </button>
        </div>
      </div>

      <div className={panelStyles["ink-body"]} style={windowBodyStyle}>
        <div className={monsterStyles["monster-stats"]}>
          <p>
            <strong>HP:</strong> {monster.hp}
          </p>
          <p>
            <strong>AC:</strong> {monster.ac}
          </p>
          <p>
            <strong>MV:</strong> {monster.movement}
          </p>
          <p>
            <strong>AL:</strong> {monster.alignment}
          </p>
          <p>
            <strong>LV:</strong> {monster.level}
          </p>
        </div>

        <hr />

        <div className={monsterStyles["monster-stats"]}>
          <p>
            <strong>Strength:</strong> {bonusToString(monster.stats.strength)}
          </p>
          <p>
            <strong>Dexterity:</strong> {bonusToString(monster.stats.dexterity)}
          </p>
          <p>
            <strong>Constitution:</strong>{" "}
            {bonusToString(monster.stats.constitution)}
          </p>
          <p>
            <strong>Intelligence:</strong>{" "}
            {bonusToString(monster.stats.intelligence)}
          </p>
          <p>
            <strong>Wisdom:</strong> {bonusToString(monster.stats.wisdom)}
          </p>
          <p>
            <strong>Charisma:</strong> {bonusToString(monster.stats.charisma)}
          </p>
        </div>

        <hr />

        <p>
          <strong>Attacks</strong>
        </p>
        <ul>
          {monster.attacks.map((a) => (
            <li key={a.name}>
              {a.perRound} <strong>{a.name}</strong>{" "}
              {a.range ? `(${a.range})` : ""}{" "}
              {a.toHit != null && (
                <ToHitButton toHit={a.toHit} text={bonusToString(a.toHit)} />
              )}{" "}
              {a.description && <DiceText text={a.description} />}
            </li>
          ))}
        </ul>

        {monster.abilities != null && monster.abilities?.length > 0 && (
          <>
            <p>
              <strong>Abilities</strong>
            </p>
            <ul>
              {monster.abilities.map((a) => (
                <li key={a.name}>
                  <strong>{a.name}</strong>: <DiceText text={a.description} />
                </li>
              ))}
            </ul>
          </>
        )}
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
  padding: "1rem",
};
