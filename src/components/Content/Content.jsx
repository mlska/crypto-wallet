import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import { Navigate, Route, Routes } from "react-router-dom";

import { default as ContentStyles } from "./Content.scss";

import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(ContentStyles);

import Cryptos from "../Cryptos/Cryptos";
import UserCryptos from "../UserCryptos/UserCryptos";

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);

  return (
    <main className={style()}>
      <Routes>
        <Route exact path="/" element={<Cryptos />} />
        {isUserLogged && (
          <Route exact path="/user-cryptos" element={<UserCryptos />} />
        )}

        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default Content;
