import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import { Navigate, Route, Routes } from "react-router-dom";

import { default as ContentStyles } from "./Content.scss";

import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(ContentStyles);

import Coins from "../Coins/Coins";
import UserCoins from "../UserCoins/UserCoins";

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);

  return (
    <main className={style()}>
      <Routes>
        <Route exact path="/" element={<Coins />} />
        {isUserLogged && (
          <Route exact path="/user-coins" element={<UserCoins />} />
        )}

        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default Content;
