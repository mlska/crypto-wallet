import React from "react";
import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.scss";

const styles = bemCssModules(HeaderStyles);

const Header = () => {
  return (
    <header className={styles()}>
      <div className={styles("logo-wrapper")}>Crypto Wallet</div>
      <ul>
        <li>
          <a href="#">Rynek</a>
        </li>
        <li>
          <a href="#">Portfel</a>
        </li>
      </ul>
      <div className={styles("btngroup")}>
        <button className={styles("btn", { secondary: true })}>
          Logowanie
        </button>
        <button className={styles("btn")}>Rejestracja</button>
      </div>
    </header>
  );
};

export default Header;
