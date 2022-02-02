import React from "react";
import {render} from "react-dom";

import {FirstSteps} from "./renderer/FirstSteps";
import "./styles.css";

render(
  <React.StrictMode>
    <FirstSteps />
  </React.StrictMode>,
  document.getElementById("root"),
);
