import React, { useState } from "react";
import type { Monster } from "../models/monster";

export type PanelBarProps = {
  monsters: Monster[];
  addMonsterPanel: (monster: Monster) => void;
};

export function PanelBar(props: PanelBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");
  const [showMonsters, setShowMonsters] = useState(true);
  const [showMisc, setShowMisc] = useState(true);

  return (
    <>
      <div
        className="window"
        style={{ ...sidebarStyle, width: isOpen ? "20vw" : "0" }}
      >
        <div className="title-bar">
          <div className="title-bar-text">Panels</div>
        </div>
        <div className="window-body" style={windowBodyStyle}>
          {isOpen && (
            <>
              <div style={searchHeaderStyle}>
                <label htmlFor="monsterSearch">Filter</label>
                <input
                  id="monsterSearch"
                  style={searchTextBoxStyle}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  type="text"
                />
                <hr />
              </div>

              <div style={scrollContainerStyle}>
                {/* Monsters Section */}
                <div style={{ position: "relative" }}>
                  <div style={stickySectionHeaderStyle}>
                    <button
                      onClick={() => setShowMonsters(!showMonsters)}
                      style={sectionHeaderButtonStyle}
                    >
                      {showMonsters ? "▼" : "▶"} Monsters
                    </button>
                  </div>
                  {showMonsters &&
                    props.monsters
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
                </div>

                {/* Misc Section */}
                <div>
                  <div style={sectionHeaderStyle}>
                    <button
                      style={sectionHeaderButtonStyle}
                      onClick={() => setShowMisc(!showMisc)}
                    >
                      {showMisc ? "▼" : "▶"} Misc
                    </button>
                  </div>
                  {showMisc &&
                    ["Test 1", "Test 2", "Test 3"].map((name) => (
                      <div key={name} className="window">
                        <div className="window-body">
                          <div style={monsterBoxStyle}>
                            <p>{name}</p>
                            <button
                              onClick={() => console.log(`Add ${name} clicked`)}
                              style={addMonsterButton}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
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
  boxShadow: "-6px 0 12px rgba(0, 0, 0, 0.5)",
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

const windowBodyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const searchHeaderStyle: React.CSSProperties = {
  flexShrink: 0,
  paddingBottom: "0.5rem",
};

const scrollContainerStyle: React.CSSProperties = {
  overflowY: "auto",
  flexGrow: 1,
};

const sectionHeaderStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginTop: "1rem",
  marginBottom: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const sectionHeaderButtonStyle: React.CSSProperties = {
  width: "100%",
};

const stickySectionHeaderStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
};
