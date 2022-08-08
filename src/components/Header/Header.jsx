import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.scss";
import { FaBitcoin } from "react-icons/fa";

import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);

  return (
    <header className={style()}>
      <div className={style("content-wrapper")}>
        <div className={style("logo")}>
          <FaBitcoin style={{ color: "rgba(247,147,26)" }} />
          Crypto Wallet
        </div>
        <ul>
          <li>
            <Link className={style("link")} to="/">
              Rynek
            </Link>
          </li>
          <li>
            <Link className={style("link")} to="/user-cryptos">
              Portfel
            </Link>
          </li>
        </ul>
        <div>
          <button className={style("btn", { secondary: !isUserLogged })}>
            {isUserLogged ? "Wyloguj" : "Logowanie"}
          </button>
          {isUserLogged ? (
            ""
          ) : (
            <button className={style("btn")}>Rejestracja</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
