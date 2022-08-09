import React, { useEffect, createContext, useState } from "react";

import axiosRequest from "../helpers/axiosRequest";

export const StoreContext = createContext(null);

const apiEndPoint =
  "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false";

const StoreProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [users, setUsers] = useState([]);

  const getCoins = () => {
    axiosRequest
      .get(apiEndPoint)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <StoreContext.Provider value={{ coins, setCoins, users, setUsers }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
