import {ThemeOptions, ThemeProvider} from "@mui/material";
import {Fragment, ReactNode} from "react";

import {useTheme} from "../../common/components/hooks/useTheme";

export const Root = ({
  children,
  themeOptions,
}: {
  children?: ReactNode;
  themeOptions?: Partial<ThemeOptions>;
}) => {
  const theme = useTheme(themeOptions);
  return (
    <Fragment>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Fragment>
  );
};
