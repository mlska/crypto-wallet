import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.scss";
import { FaBitcoin } from "react-icons/fa";

import { StoreContext } from "../../store/StoreProvider";

import LoginForm from "../Forms/LoginForm/LoginForm";
import SignForm from "../Forms/SignForm/SignForm";

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const { activeUser, setActiveUser } = useContext(StoreContext);

  const isUserLogged = Boolean(activeUser);

  const handleOnCloseLogin = () => setIsLoginModalOpen(false);
  const handleOnClickLogin = () => {
    if (isUserLogged) {
      setActiveUser(null);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleOnCloseSign = () => setIsSignModalOpen(false);
  const handleOnClickSign = () => setIsSignModalOpen(true);

  return (
    <header className={style()}>
      <div className={style("content-wrapper")}>
        <div className={style("logo")}>
          <FaBitcoin style={{ color: "rgba(247,147,26)" }} />
          Crypto Wallet
        </div>
        {isUserLogged && (
          <ul>
            <li>
              <Link className={style("link")} to="/">
                Rynek
              </Link>
            </li>
            <li>
              <Link className={style("link")} to="/user-coins">
                Portfel
              </Link>
            </li>
          </ul>
        )}
        <div>
          <button
            className={style("btn", { secondary: !isUserLogged })}
            onClick={handleOnClickLogin}
          >
            {isUserLogged ? "Wyloguj" : "Logowanie"}
          </button>
          {!isUserLogged && (
            <button onClick={handleOnClickSign} className={style("btn")}>
              Rejestracja
            </button>
          )}
        </div>
      </div>
      <LoginForm
        handleOnClose={handleOnCloseLogin}
        isModalOpen={isLoginModalOpen}
      ></LoginForm>
      <SignForm
        handleOnClose={handleOnCloseSign}
        isModalOpen={isSignModalOpen}
      ></SignForm>
    </header>
  );
};

export default Header;
