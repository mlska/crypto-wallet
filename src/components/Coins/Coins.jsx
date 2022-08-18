import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";

import { default as CoinsStyles } from "./Coins.scss";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(CoinsStyles);

import Coin from "../Coin/Coin";

const Coins = () => {
  const { coins } = useContext(StoreContext);
  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const coinsList = filteredCoins.map((coin) => (
    <Coin key={coin.id} {...coin} />
  ));

  return (
    <section className={style()}>
      <div className={style("container")}>
        <h2 className={style("title")}>Dostępne kryptowaluty</h2>
        <input
          className={style("input")}
          type="text"
          placeholder="Szukaj"
          onChange={handleChange}
        />
      </div>
      <ul className={style("list")}>{coinsList}</ul>
    </section>
  );
};

export default Coins;
