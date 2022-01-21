import "./styles.css";

import React from "react";
import {render} from "react-dom";
import {Root} from "./components/Root";

render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
