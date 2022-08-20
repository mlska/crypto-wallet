import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.scss";
import { FaBitcoin } from "react-icons/fa";
import { AiOutlineUser, AiOutlineDollarCircle } from "react-icons/Ai";
import { RiCoinLine } from "react-icons/ri";

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
        <Link className={style("logo")} to="/">
          <FaBitcoin />
          Crypto Wallet
        </Link>
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
        {isUserLogged && (
          <div className={style("user-info")}>
            <div>
              <AiOutlineUser />
              {activeUser.name} {activeUser.surname}
            </div>
            <div>
              <AiOutlineDollarCircle />
              {activeUser.cash.toFixed(2)}
            </div>
            <div>
              <RiCoinLine />
              {activeUser.coins.length}
            </div>
          </div>
        )}
        <div className={style("section-wrap")}>
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
