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

  const { activeUser } = useContext(StoreContext);

  const isUserLogged = Boolean(activeUser);

  const handleOnChange = (event) => setCoinAmount(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Zakupiono ${coinAmount}  kryptowaluty ${id}`);
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
          <input onChange={handleOnChange} value={coinAmount} type="number" />
          <button type="submit">Zakup kryptowalutę</button>
        </form>
      )}
    </article>
  );
};

export default Coin;
