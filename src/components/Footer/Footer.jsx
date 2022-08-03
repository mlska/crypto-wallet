import React from "react";
import bemCssModules from "bem-css-modules";

import { default as FooterStyles } from "./Footer.scss";

const styles = bemCssModules(FooterStyles);

const Footer = () => {
  return (
    <footer className={styles()}>
      <div>Copyright &copy; mlska</div>
    </footer>
  );
};

export default Footer;
