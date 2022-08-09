import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import bemCssModules from "bem-css-modules";

import { default as ModalStyles } from "./Modal.scss";

const style = bemCssModules(ModalStyles);

const Modal = ({ children, isOpen }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    isOpen ? modalRef.current.showModal() : modalRef.current.close();
  }, [isOpen]);

  return ReactDOM.createPortal(
    <dialog className={style()} ref={modalRef}>
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;
