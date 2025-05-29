import React, { useState } from "react";
import type { Monster } from "../models/monster";

export type PanelBarProps = {
  monsters: Monster[];
  addMonsterPanel: (monster: Monster) => void;
};

export function PanelBar(props: PanelBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");

  return (
    <>
      <div
        className="window"
        style={{ ...sidebarStyle, width: isOpen ? "20vw" : "0" }}
      >
        <div className="title-bar">
          <div className="title-bar-text">Monsters</div>
        </div>
        <div className="window-body">
          {isOpen && (
            <>
              <div>
                <label htmlFor="monsterSearch">Filter</label>
                <input
                  id="monsterSearch"
                  style={searchTextBoxStyle}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  type="text"
                />
              </div>

              <hr></hr>

              {props.monsters
                .filter((m) => {
                  return (
                    Number(filter) === m.level ||
                    m.name.toLowerCase().includes(filter.toLowerCase())
                  );
                })
                .map((m) => (
                  <div key={m.name} className="window">
                    <div className="window-body">
                      <div style={monsterBoxStyle}>
                        <p>
                          {m.name}, level {m.level}
                        </p>
                        <button
                          onClick={() => props.addMonsterPanel(m)}
                          style={addMonsterButton}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ ...toggleButtonStyle, right: isOpen ? "20vw" : "0" }}
      >
        {isOpen ? "Collapse Catalog >" : "< Expand Catalog"}
      </button>
    </>
  );
}

const sidebarStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  borderLeft: "1px solid #ccc",
  overflowX: "hidden",
  overflowY: "auto",
  boxSizing: "border-box",
  transition: "width 0.3s ease, padding 0.3s ease",
  zIndex: 1000,
  boxShadow: "-6px 0 12px rgba(0, 0, 0, 0.5)"
};

const toggleButtonStyle: React.CSSProperties = {
  position: "fixed",
  top: "1rem",
  minWidth: "0px",
  zIndex: 1001,
  padding: "0.5rem",
  cursor: "pointer",
  transition: "right 0.3s ease",
};

const monsterBoxStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const addMonsterButton: React.CSSProperties = {
  minWidth: "0px",
};

const searchTextBoxStyle: React.CSSProperties = {
  color: "black",
};
