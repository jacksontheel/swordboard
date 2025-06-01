import "98.css";
import { useEffect, useState, type CSSProperties } from "react";
import { torchTimerContent } from "../../models/panelContent";

export type TorchTimerPanelProps = {
  closeCallback: () => void;
};

export function TorchTimerPanel(props: TorchTimerPanelProps) {
  const [seconds, setSeconds] = useState(60 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const adjustTime = (delta: number) => {
    setSeconds((prev) => Math.max(prev + delta, 0));
  };

  return (
    <div className="window" style={windowStyle}>
      <div className="title-bar">
        <div className="title-bar-text">{torchTimerContent.name}</div>
        <div className="title-bar-controls">
          <button
            aria-label="Close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={props.closeCallback}
          />
        </div>
      </div>
      <div className="window-body" style={windowBodyStyle}>
        <p style={timerStyle}>
          <strong>{formatTime(seconds)}</strong>
        </p>
        <div style={buttonRowStyle}>
          <button onClick={() => setRunning((prev) => !prev)}>
            {running ? "Pause" : "Play"}
          </button>
          <button onClick={() => setSeconds(60 * 60)}>Reset</button>
          <div>
            <button onClick={() => adjustTime(300)}>+5 min</button>
            <button onClick={() => adjustTime(-300)}>-5 min</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const windowStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

const windowBodyStyle: CSSProperties = {
  overflow: "auto",
  height: "calc(100% - 30px)",
  paddingRight: "0.5rem",
};

const timerStyle: React.CSSProperties = {
  textAlign: "center",
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  maxWidth: "300px",
  margin: "0 auto",
};
