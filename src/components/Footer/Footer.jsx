import React from "react";
import bemCssModules from "bem-css-modules";

import { default as FooterStyles } from "./Footer.scss";

const styles = bemCssModules(FooterStyles);

const Footer = () => {
  return (
    <footer className={styles()}>
      <div>Copyright &copy; 2022 mlska. All Rights Reserved</div>
    </footer>
  );
};

export default Footer;
