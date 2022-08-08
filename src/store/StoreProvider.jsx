import React, { useEffect, createContext, useState } from "react";

import axiosRequest from "../helpers/axiosRequest";

export const StoreContext = createContext(null);

const apiEndPoint =
  "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false";

const StoreProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([]);
  const [user, setUser] = useState(null);

  const getCryptos = () => {
    axiosRequest
      .get(apiEndPoint)
      .then((response) => {
        setCryptos(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCryptos();
  }, []);

  return (
    <StoreContext.Provider value={{ cryptos, setCryptos, user, setUser }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
