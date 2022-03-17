import {ThemeOptions} from "@mui/material";
import React, {ReactNode} from "react";
import {render} from "react-dom";

import {Root} from "./components/Root";

export const renderRoot = (
  children: ReactNode,
  props?: {themeOptions: Partial<ThemeOptions>},
) => {
  render(
    <React.StrictMode>
      <Root {...props}>{children}</Root>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};
