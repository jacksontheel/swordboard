import type { PanelContent } from "../../models/panelContent";
import panelStyles from "../style/Panel.module.css";
import catalogStyles from "../style/Catalog.module.css";

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
    <div className={catalogStyles["catalog-section"]}>
      <div className={catalogStyles["catalog-header sticky-header"]}>
        <button
          onClick={() => props.setExpanded(!props.expanded)}
          className={`${catalogStyles["catalog-toggle-button"]} ${props.expanded && props.panelContent.length > 0 ? catalogStyles["catalog-toggle-button-expanded"] : ""}`}
        >
          {props.expanded ? "▼" : "▶"} {props.title}
        </button>
      </div>
      <div>
        {props.expanded &&
          props.panelContent.map((t) => (
            <div
              key={t.name}
              className={`${panelStyles["ink-panel"]} ${catalogStyles["catalog-item-container"]}`}
            >
              <div className={catalogStyles["catalog-item"]}>
                <p>{props.panelTextFunction(t)}</p>
                <button
                  onClick={() => props.addPanelFunction(t)}
                  className={`${panelStyles["ink-button"]} ${catalogStyles["compact-button"]}}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
