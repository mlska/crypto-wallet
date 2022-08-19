import React, { useState, useContext } from "react";
import bemCssModules from "bem-css-modules";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

import { default as UserCoinStyles } from "./UserCoin.scss";
import { StoreContext } from "../../../store/StoreProvider";

const style = bemCssModules(UserCoinStyles);

const UserCoin = ({
  name,
  symbol,
  image,
  id,
  pay,
  amount,
  current_price: currentPrice,
}) => {
  const [coinAmount, setCoinAmount] = useState(amount);

  const { activeUser, setActiveUser, users, setUsers } =
    useContext(StoreContext);

  const averageUserCoinPrice = pay / amount;
  const profit = parseFloat(
    ((currentPrice / averageUserCoinPrice) * 100 - 100).toFixed(3)
  );

  const handleOnChange = (event) => setCoinAmount(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = activeUser;

    if (amount === parseFloat(coinAmount)) {
      const index = user.coins.map((coin) => coin.id).indexOf(id);
      console.log(index);
      user.coins.splice(index, 1);
    } else {
      user.coins.map((coin) => {
        if (coin.id === id) {
          coin.amount -= parseFloat(coinAmount);
          coin.pay -= parseFloat(averageUserCoinPrice * coinAmount);
        }
      });
    }

    user.cash += coinAmount * currentPrice;

    const updatedUsers = users.map((element) => {
      if ((element.id = activeUser.id)) {
        return user;
      }
    });

    setActiveUser(user);
    setUsers(updatedUsers);
  };

  return (
    <article className={style()}>
      <h3 className={style("name")}>{`${name} (${symbol.toUpperCase()})`}</h3>
      <img src={image} alt={name} className={style("image")} />
      <p className={style("amount")}>
        {`Ilość:`} <span>{amount}</span>
      </p>
      <p className={style("price")}>
        {`Cena zakupu:`}
        <span> ${averageUserCoinPrice}</span>
      </p>
      <p className={style("price")}>
        {`Aktualna cena:`}
        <span> ${currentPrice}</span>
      </p>
      <p className={style("percentage")}>
        Zysk:{" "}
        {profit !== 0 ? (
          profit >= 0 ? (
            <span style={{ color: "green" }}>
              {profit}% <ImArrowUp />
            </span>
          ) : (
            <span style={{ color: "red" }}>
              {profit}% <ImArrowDown />
            </span>
          )
        ) : (
          <span>{profit}%</span>
        )}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleOnChange}
          value={coinAmount}
          type="number"
          step={0.0000001}
          min={0}
        />
        <button type="submit">Sprzedaj</button>
      </form>
    </article>
  );
};

export default UserCoin;
