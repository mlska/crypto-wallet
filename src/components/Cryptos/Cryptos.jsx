import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";

import { default as CryptosStyles } from "./Cryptos.scss";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(CryptosStyles);

import Coin from "../Coin/Coin";

const Cryptos = () => {
  const { cryptos } = useContext(StoreContext);

  const coinsList = cryptos.map((coin) => <Coin key={coin.id} {...coin} />);

  return (
    <section className={style()}>
      <h2 className={style("title")}>Dostępne kryptowaluty</h2>
      <ul className={style("list")}>{coinsList}</ul>
    </section>
  );
};

export default Cryptos;
