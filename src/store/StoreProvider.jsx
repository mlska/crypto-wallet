import React, { useEffect, createContext, useState } from "react";

import axiosRequest from "../helpers/axiosRequest";

export const StoreContext = createContext(null);

const apiEndPoint =
  "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false";

const localStorageKey = "users";

const StoreProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  const getCoins = () => {
    axiosRequest
      .get(apiEndPoint)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getLocalStorageUsers = () => {
    const data = localStorage.getItem(localStorageKey);
    const users = JSON.parse(data);
    users && setUsers(users);
  };

  const setLocalStorageUsers = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  };

  useEffect(() => {
    getCoins();
    getLocalStorageUsers();
  }, []);

  useEffect(() => {
    setLocalStorageUsers();
  }, [users]);

  return (
    <StoreContext.Provider
      value={{ coins, setCoins, users, setUsers, activeUser, setActiveUser }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
