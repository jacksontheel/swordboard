import type { PanelContent } from "../../models/panelContent";

export type CatalogSectionProps<T extends PanelContent> = {
  title: string;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  panelContent: T[];
  addPanelFunction: (t: T) => void;
  panelTextFunction: (t: T) => string;
};

export function CatalogSection<T extends PanelContent>(
  props: CatalogSectionProps<T>,
) {
  return (
    <div style={{ position: "relative" }}>
      <div style={stickySectionHeaderStyle}>
        <button
          onClick={() => props.setExpanded(!props.expanded)}
          style={sectionHeaderButtonStyle}
        >
          {props.expanded ? "▼" : "▶"} {props.title}
        </button>
      </div>
      {props.expanded &&
        props.panelContent.map((t) => (
          <div key={t.name} className="window">
            <div className="window-body">
              <div style={monsterBoxStyle}>
                <p>{props.panelTextFunction(t)}</p>
                <button
                  onClick={() => props.addPanelFunction(t)}
                  style={addMonsterButton}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

const monsterBoxStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const addMonsterButton: React.CSSProperties = {
  minWidth: "0px",
};

const sectionHeaderButtonStyle: React.CSSProperties = {
  width: "100%",
};

const stickySectionHeaderStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
};
