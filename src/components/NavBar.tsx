import React from "react";

export function NavBar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.title}>Sword Board</div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: "1rem",
    backgroundColor: "#222",
    color: "#fff",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  } as React.CSSProperties,
};
