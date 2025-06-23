import headerStyles from "./style/Header.module.css"

export function Footer() {
  return (
    <footer className={`${headerStyles["ink-navbar"]} ${headerStyles["ink-footer"]}`}>
      Sword Board is an independent product published under the Shadowdark RPG
      Third-Party License and is not affiliated with The Arcane Library, LLC.
      Shadowdark RPG © 2023 The Arcane Library, LLC.
    </footer>
  );
}
