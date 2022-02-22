import React from "react";
import {render} from "react-dom";

import "../common/styles";
import {LayerWindowGuide} from "./components/LayerWindowGuide";

render(
  <React.StrictMode>
    <LayerWindowGuide />
  </React.StrictMode>,
  document.getElementById("root"),
);
