import {ThemeProvider} from "@mui/material";
import {Fragment, ReactNode} from "react";

import {useTheme} from "../../common/components/hooks/useTheme";

export const Root = ({children}: {children?: ReactNode}) => {
  const theme = useTheme();
  return (
    <Fragment>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Fragment>
  );
};
