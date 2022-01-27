import React from "react";
import {render} from "react-dom";

import {Root} from "./renderer/Root";
import "./styles.css";

render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
