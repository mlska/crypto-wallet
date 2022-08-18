import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";

import { default as UserCoinsStyles } from "./UserCoins.scss";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(UserCoinsStyles);

import UserCoin from "./subcomponents/UserCoin";

const UserCoins = () => {
  const { activeUser, coins } = useContext(StoreContext);
  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);

  const filteredCoins = activeUser.coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const coinsList = filteredCoins.map(function (coin) {
    let currentPrice = 0;

    coins.forEach((element) => {
      if (element.id === coin.id) {
        currentPrice = element.current_price;
        return;
      }
    });
    return <UserCoin key={coin.id} {...coin} current_price={currentPrice} />;
  });

  return (
    <section className={style()}>
      <div className={style("container")}>
        <h2 className={style("title")}>Zakupione kryptowaluty</h2>
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

export default UserCoins;
