import React from "react";
import "react-clock/dist/Clock.css";
import {render} from "react-dom";

import {Root} from "./components/Root";
import "./styles";

render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
