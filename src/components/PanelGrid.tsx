import {
  Responsive,
  WidthProvider,
  type Layout,
  type Layouts,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { MonsterPanel } from "./MonsterPanel";
import React from "react";
import type { Monster } from "../models/monster";

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

export type Panel = { id: string; w: number; h: number; monster: Monster };

export type PanelGridProps = {
  panels: Panel[];
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
};

export function PanelGrid(props: PanelGridProps) {
  const currentLayouts: Layouts = {
    lg: generateCompactLayout(props.panels, cols.lg),
    md: generateCompactLayout(props.panels, cols.md),
    sm: generateCompactLayout(props.panels, cols.sm),
    xs: generateCompactLayout(props.panels, cols.xs),
    xxs: generateCompactLayout(props.panels, cols.xxs),
  };

  function generateCompactLayout(panels: Panel[], cols: number): Layout[] {
    let currentX = 0;
    let currentY = 0;
    let rowHeight = 0;

    return panels.reduce<Layout[]>((layout, panel) => {
      if (currentX + panel.w > cols) {
        currentX = 0;
        currentY += rowHeight;
        rowHeight = 0;
      }

      layout.push({
        i: panel.id,
        x: currentX,
        y: currentY,
        w: panel.w,
        h: panel.h,
      });

      currentX += panel.w;
      rowHeight = Math.max(rowHeight, panel.h);

      return layout;
    }, []);
  }

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveGrid
        className="layout"
        layouts={currentLayouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        isResizable
        isDraggable
        useCSSTransforms
        draggableHandle=".title-bar"
        onLayoutChange={(layout) => {
          props.setPanels((prev) =>
            prev.map((p) => {
              const updated = layout.find((l) => l.i === p.id);
              return updated
                ? { ...p, w: updated.w, h: updated.h, layout: updated }
                : p;
            }),
          );
        }}
      >
        {props.panels.map((p) => (
          <div key={p.id} style={boxStyle}>
            <MonsterPanel
              monster={p.monster}
              closeCallback={() => {
                props.setPanels((prev) =>
                  prev.filter((prevP) => prevP.id !== p.id),
                );
              }}
            />
          </div>
        ))}
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
