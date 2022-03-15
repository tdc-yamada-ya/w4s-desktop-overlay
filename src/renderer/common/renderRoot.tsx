import React, {ReactNode} from "react";
import {render} from "react-dom";

import {Root} from "./components/Root";

export const renderRoot = (children: ReactNode) => {
  render(
    <React.StrictMode>
      <Root>{children}</Root>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};
