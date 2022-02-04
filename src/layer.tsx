import React from "react";
import {render} from "react-dom";

import {LayerWindowGuide} from "./renderer/LayerWindowGuide";
import "./styles.css";

render(
  <React.StrictMode>
    <LayerWindowGuide />
  </React.StrictMode>,
  document.getElementById("root"),
);
