import React, { useContext, useEffect, useState } from "react";
import bemCssModules from "bem-css-modules";

import Modal from "../../Modal/Modal";

import { default as LoginFormStyles } from "./LoginForm.scss";

const style = bemCssModules(LoginFormStyles);

import { StoreContext } from "../../../store/StoreProvider";

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { users } = useContext(StoreContext);

  const handleOnChangeLogin = (event) => setLogin(event.target.value);
  const handleOnChangePassword = (event) => setPassword(event.target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const resetStateofInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    resetStateofInputs();
    handleOnClose();
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
        <h3 className={style("title")}>Logowanie użytkownika</h3>
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
        {validateMessageComponent}
        <div className={style("row")}>
          <button type="submit">Zaloguj</button>
          <button onClick={handleOnCloseModal} type="button">
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
