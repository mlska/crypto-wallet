import React from "react";
import ReactDOM from "react-dom/client";

import WebFont from "webfontloader";

import App from "./App";

WebFont.load({
  google: {
    families: ["Manrope", "Inter"],
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
