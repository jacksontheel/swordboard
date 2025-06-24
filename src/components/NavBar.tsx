import headerStyles from "./style/Header.module.css";

export function NavBar() {
  return (
    <nav className={headerStyles["ink-navbar"]}>
      <div className={headerStyles["ink-navbar-title"]}>Sword Board</div>
    </nav>
  );
}
