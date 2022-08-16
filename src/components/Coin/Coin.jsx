import React, { useContext, useState } from "react";
import bemCssModules from "bem-css-modules";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

import { default as CoinStyles } from "./Coin.scss";
import { StoreContext } from "../../store/StoreProvider";

const style = bemCssModules(CoinStyles);

const Coin = ({
  name,
  symbol,
  image,
  id,
  market_cap,
  current_price,
  price_change_percentage_24h,
}) => {
  const [coinAmount, setCoinAmount] = useState(0);

  const { activeUser, setActiveUser, users, setUsers } =
    useContext(StoreContext);

  const isUserLogged = Boolean(activeUser);

  const handleOnChange = (event) => setCoinAmount(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userHasEnoughCash = activeUser.cash > coinAmount * current_price;
    const validAmountOfCoins = coinAmount > 0;

    if (validAmountOfCoins && userHasEnoughCash) {
      const user = activeUser;

      const userHasCoin = user.coins.some((item) => item.id === id);

      if (userHasCoin) {
        const index = user.coins.findIndex((object) => object.id === id);
        user.coins[index].amount += parseFloat(coinAmount);
      } else {
        user.coins.push({ id, amount: parseFloat(coinAmount) });
      }

      user.cash = user.cash - coinAmount * current_price;

      const updatedUsers = users.map((element) => {
        if ((element.id = activeUser.id)) {
          return { ...element, cash: user.cash, coins: user.coins };
        }
      });

      setActiveUser(user);
      setUsers(updatedUsers);
      setCoinAmount(0);
    } else {
      return console.log("Zbyt mała ilość dolarów aby kupić");
    }
  };

  return (
    <article className={style()}>
      <h3 className={style("name")}>{`${name} (${symbol.toUpperCase()})`}</h3>
      <img src={image} alt={name} className={style("image")} />
      <p className={style("price")}>
        {`Cena kryptowaluty:`} <span>${current_price}</span>
      </p>
      <p className={style("cap")}>
        {`Kapitalizacja:`}
        <span> ${market_cap}</span>
      </p>
      <p className={style("percentage")}>
        Zmiana 24h:{" "}
        {price_change_percentage_24h > 0 ? (
          <span style={{ color: "green" }}>
            {price_change_percentage_24h}% <ImArrowUp />
          </span>
        ) : (
          <span style={{ color: "red" }}>
            {price_change_percentage_24h}% <ImArrowDown />
          </span>
        )}
      </p>
      {isUserLogged && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleOnChange}
            value={coinAmount}
            type="number"
            step={0.0000001}
            min={0}
          />
          <button type="submit">Zakup kryptowalutę</button>
        </form>
      )}
    </article>
  );
};

export default Coin;
