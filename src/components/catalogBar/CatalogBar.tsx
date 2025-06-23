import { useState } from "react";
import type { Monster } from "../../models/monster";
import { CatalogSection } from "./CatalogSection";
import {
  torchTimerContent,
  type PanelContent,
} from "../../models/panelContent";
import panelStyles from "../style/Panel.module.css";
import catalogStyles from "../style/Catalog.module.css";

export type CatalogBarProps = {
  monsters: Monster[];
  addMonsterPanel: (monster: Monster) => void;
  addTorchTimerPanel: () => void;
};

export function CatalogBar(props: CatalogBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState("");
  const [showMonsters, setShowMonsters] = useState(true);
  const [showMisc, setShowMisc] = useState(true);

  return (
    <>
      <div
        className={catalogStyles["ink-sidebar"]}
        style={{ width: isOpen ? "20vw" : "0" }}
      >
        <div className={panelStyles["ink-header"]}>
          <div className={panelStyles["ink-header-title"]}>Catalog</div>
        </div>
        <div className={catalogStyles["ink-sidebar-body"]}>
          {isOpen && (
            <>
              <div className={catalogStyles["catalog-search"]}>
                <label htmlFor="monsterSearch">Filter:</label>
                <input
                  id="monsterSearch"
                  className={catalogStyles["catalog-search-input"]}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  type="text"
                />
                <hr />
              </div>

                <div className={catalogStyles["catalog-scroll"]}>
                  <CatalogSection
                    title={"Misc"}
                    expanded={showMisc}
                    setExpanded={setShowMisc}
                    panelContent={[torchTimerContent].filter((t) =>
                      t.name.toLowerCase().includes(filter.toLowerCase()),
                    )}
                    addPanelFunction={props.addTorchTimerPanel}
                    panelTextFunction={(pc: PanelContent) => pc.name}
                  />

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
        className={catalogStyles["ink-sidebar-toggle"]}
        style={{ right: isOpen ? "20vw" : "0" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Collapse Catalog >" : "< Expand Catalog"}
      </button>
    </>
  );
}
