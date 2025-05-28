import { useEffect, useState } from "react";
import "./App.css";
import { PanelBar } from "./components/PanelBar";
import { PanelGrid, type Panel } from "./components/PanelGrid";
import type { Monster } from "./models/monster";
import { createClient } from "@supabase/supabase-js";
import { NavBar } from "./components/NavBar";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [monsters, setMonsters] = useState<Monster[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  const getInstruments = async () => {
    const { data } = await supabase.from("Monsters").select();
    setMonsters(data?.map((d) => d.data) as Monster[]);
  };

  const addMonsterPanel = (monster: Monster) => {
    setPanels((prev) => {
      const nextId = crypto.randomUUID();
      return [...prev, { id: nextId, w: 3, h: 3, monster }];
    });
  };

  return (
    <>
      <NavBar />
      <PanelGrid panels={panels} setPanels={setPanels} />
      <PanelBar addMonsterPanel={addMonsterPanel} monsters={monsters} />
    </>
  );
}

export default App;
