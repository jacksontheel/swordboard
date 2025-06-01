import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React, { useEffect } from "react";
import { type Monster } from "../models/monster";
import { MonsterPanel } from "./panels/MonsterPanel";
import type { PanelContent } from "../models/panelContent";
import { TorchTimerPanel } from "./panels/TorchTimerPanel";

const ResponsiveGrid = WidthProvider(Responsive);

const breakpoints: { [key: string]: number } = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
};

const cols: { [key: string]: number } = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xxs: 2,
};

export type Panel<T extends PanelContent> = {
  id: string;
  w: number;
  h: number;
  x: number;
  y: number;
  content: T;
};

export type PanelGridProps<T extends PanelContent> = {
  panels: Panel<T>[];
  setPanels: React.Dispatch<React.SetStateAction<Panel<T>[]>>;
  setColSize: React.Dispatch<React.SetStateAction<number>>;
};

export function PanelGrid<T extends PanelContent>(props: PanelGridProps<T>) {
  useEffect(() => {
    const a = localStorage.getItem("layout");

    if (a != null) {
      props.setPanels(JSON.parse(a));
    }
  }, []);

  const currentLayouts: Layouts = {
    lg: props.panels.map((p) => ({ i: p.id, x: p.x, y: p.y, w: p.w, h: p.h })),
    md: props.panels.map((p) => ({ i: p.id, x: p.x, y: p.y, w: p.w, h: p.h })),
    sm: props.panels.map((p) => ({ i: p.id, x: p.x, y: p.y, w: p.w, h: p.h })),
    xs: props.panels.map((p) => ({ i: p.id, x: p.x, y: p.y, w: p.w, h: p.h })),
    xxs: props.panels.map((p) => ({ i: p.id, x: p.x, y: p.y, w: p.w, h: p.h })),
  };

  const renderPanel = (p: Panel<T>) => {
    switch (p.content.type) {
      case "monster":
        return (
          <MonsterPanel
            monster={p.content as unknown as Monster}
            closeCallback={() => {
              props.setPanels((prev) =>
                prev.filter((prevP) => prevP.id !== p.id),
              );
            }}
          />
        );
      case "torchTimer":
        return (
          <TorchTimerPanel
            closeCallback={() => {
              props.setPanels((prev) =>
                prev.filter((prevP) => prevP.id !== p.id),
              );
            }}
          ></TorchTimerPanel>
        );
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveGrid
        className="layout"
        layouts={currentLayouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={64}
        isResizable
        isDraggable
        useCSSTransforms
        draggableHandle=".title-bar"
        onBreakpointChange={(_, colSize) => props.setColSize(colSize)}
        onLayoutChange={(layout) => {
          props.setPanels((prev) =>
            prev.map((p) => {
              const updated = layout.find((l) => l.i === p.id);
              return updated
                ? {
                    ...p,
                    x: updated.x,
                    y: updated.y,
                    w: updated.w,
                    h: updated.h,
                  }
                : p;
            }),
          );
          localStorage.setItem("layout", JSON.stringify(props.panels));
        }}
      >
        {props.panels.map((p) => {
          return (
            <div key={p.id} style={boxStyle}>
              {renderPanel(p)}
            </div>
          );
        })}
      </ResponsiveGrid>
    </div>
  );
}

const boxStyle: React.CSSProperties = {
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.2rem",
};
