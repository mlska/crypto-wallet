import React from "react";
import { HashRouter as Router } from "react-router-dom";
import StoreProvider from "./store/StoreProvider";

import bemCssModules from "bem-css-modules";
import { default as AppStyles } from "./App.scss";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

const style = bemCssModules(AppStyles);

const App = () => {
  return (
    <StoreProvider>
      <div className={style()}>
        <Router>
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </Router>
      </div>
    </StoreProvider>
  );
};

export default App;
