import React from "react";
import bemCssModules from "bem-css-modules";

import { default as ContentStyles } from "./Content.scss";

const styles = bemCssModules(ContentStyles);

const Content = () => {
  return (
    <section className={styles()}>
      <div>Content</div>
    </section>
  );
};

export default Content;
