import React, { useState } from "react";
import type { Monster } from "../../models/monster";
import { CatalogSection } from "./CatalogSection";

export type CatalogBarProps = {
  monsters: Monster[];
  addMonsterPanel: (monster: Monster) => void;
};

export function CatalogBar(props: CatalogBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");
  const [showMonsters, setShowMonsters] = useState(true);

  return (
    <>
      <div
        className="window"
        style={{ ...sidebarStyle, width: isOpen ? "20vw" : "0" }}
      >
        <div className="title-bar">
          <div className="title-bar-text">Catalog</div>
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
                <CatalogSection
                  title={"Monsters"}
                  expanded={showMonsters}
                  setExpanded={setShowMonsters}
                  panelContent={props.monsters.filter(
                    (m) =>
                      Number(filter) === m.level ||
                      m.name.toLowerCase().includes(filter.toLowerCase()),
                  )}
                  addPanelFunction={props.addMonsterPanel}
                  panelTextFunction={(m: Monster) => `${m.name}, ${m.level}`}
                />
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