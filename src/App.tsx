import { useEffect, useState } from "react";
import "./App.css";
import { PanelGrid, type Panel } from "./components/PanelGrid";
import type { Monster } from "./models/monster";
import { createClient } from "@supabase/supabase-js";
import { NavBar } from "./components/NavBar";
import { CatalogBar } from "./components/catalogBar/CatalogBar";
import { torchTimerContent } from "./models/panelContent";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [panels, setPanels] = useState<Panel<any>[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [colSize, setColSize] = useState(12);

  useEffect(() => {
    getInstruments();
  }, []);

  const getInstruments = async () => {
    const { data } = await supabase.from("Monsters").select().order("name");
    setMonsters(
      data?.map((d) => ({ ...d.data, type: "monster" })) as Monster[],
    );
  };

  const addMonsterPanel = (monster: Monster) => {
    setPanels((prev) => {
      const nextId = crypto.randomUUID();
      const nextAvailable = findFirstAvailableSpot(prev, colSize, 3, 3);
      return [
        ...prev,
        {
          id: nextId,
          w: 3,
          h: 4,
          x: nextAvailable.x,
          y: nextAvailable.y,
          content: monster,
        },
      ];
    });
  };

  const addTorchTimerPanel = () => {
    setPanels((prev) => {
      const nextId = crypto.randomUUID();
      const nextAvailable = findFirstAvailableSpot(prev, colSize, 3, 3);
      return [
        ...prev,
        {
          id: nextId,
          w: 3,
          h: 2,
          x: nextAvailable.x,
          y: nextAvailable.y,
          content: torchTimerContent,
        },
      ];
    });
  };

  const findFirstAvailableSpot = (
    existing: Panel<any>[],
    cols: number,
    panelW: number,
    panelH: number,
  ): { x: number; y: number } => {
    const occupied: Set<string> = new Set();

    for (const panel of existing) {
      const { x = 0, y = 0, w, h } = panel;
      for (let dx = 0; dx < w; dx++) {
        for (let dy = 0; dy < h; dy++) {
          occupied.add(`${x + dx},${y + dy}`);
        }
      }
    }

    for (let y = 0; y < 100; y++) {
      for (let x = 0; x <= cols - panelW; x++) {
        let fits = true;
        for (let dx = 0; dx < panelW; dx++) {
          for (let dy = 0; dy < panelH; dy++) {
            if (occupied.has(`${x + dx},${y + dy}`)) {
              fits = false;
              break;
            }
          }
          if (!fits) break;
        }
        if (fits) return { x, y };
      }
    }

    return { x: 0, y: 100 };
  };

  return (
    <>
      <NavBar />
      <PanelGrid
        panels={panels}
        setPanels={setPanels}
        setColSize={setColSize}
      />
      <CatalogBar
        addMonsterPanel={addMonsterPanel}
        addTorchTimerPanel={addTorchTimerPanel}
        monsters={monsters}
      />
    </>
  );
}

export default App;
