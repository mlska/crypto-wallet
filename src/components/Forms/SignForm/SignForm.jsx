import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import bemCssModules from "bem-css-modules";

import Modal from "../../Modal/Modal";

import { default as SignFormStyles } from "./SignForm.scss";

const style = bemCssModules(SignFormStyles);

import { StoreContext } from "../../../store/StoreProvider";

const SignForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const { users, setUsers } = useContext(StoreContext);

  const handleOnChangeLogin = (event) => setLogin(event.target.value);
  const handleOnChangePassword = (event) => setPassword(event.target.value);
  const handleOnChangeEmail = (event) => setEmail(event.target.value);
  const handleOnChangeName = (event) => setName(event.target.value);
  const handleOnChangeSurname = (event) => setSurname(event.target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const resetStateofInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
    setEmail("");
    setName("");
    setSurname("");
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    resetStateofInputs();

    const newUser = {
      id: uuid().slice(0, 8),
      login,
      password,
      name,
      surname,
      email,
      cash: parseInt(10000),
      coins: [],
    };

    setUsers((prevState) => [...prevState, newUser]);

    setValidateMessage("Udało się!");
    console.log("Nowy użytkownik stworzony");
    console.log(newUser);
    // handleOnClose();
  };

  useEffect(() => {
    if (isModalOpen) {
      resetStateofInputs();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  return (
    <Modal handleOnClose={handleOnClose} isOpen={isModalOpen}>
      <form className={style()} onSubmit={handleOnSubmit}>
        <h3 className={style("title")}>Rejestracja użytkownika</h3>
        <div className={style("row")}>
          <label>
            <span className={style("text")}>Login:</span>
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <span className={style("text")}>Hasło:</span>
            <input
              onChange={handleOnChangePassword}
              type="password"
              value={password}
            />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <span className={style("text")}>E-mail:</span>
            <input onChange={handleOnChangeEmail} type="email" value={email} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <span className={style("text")}>Imię:</span>
            <input onChange={handleOnChangeName} type="text" value={name} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            <span className={style("text")}>Nazwisko:</span>
            <input
              onChange={handleOnChangeSurname}
              type="text"
              value={surname}
            />
          </label>
        </div>
        {validateMessageComponent}
        <div className={style("row")}>
          <button type="submit">Zarejestruj się</button>
          <button onClick={handleOnCloseModal} type="button">
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignForm;
