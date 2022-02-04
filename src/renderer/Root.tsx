import {Box, ThemeProvider} from "@mui/material";
import {Fragment} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import {App} from "./App";
import {useTheme} from "./hooks/useTheme";
import {useVersion} from "./hooks/useVersion";

export const Root = () => {
  const theme = useTheme();
  const version = useVersion();
  return (
    <Fragment>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              height: "100%",
            }}
          >
            <Helmet>
              <title>W4S Desktop Overlay {version}</title>
            </Helmet>
            <App />
          </Box>
        </ThemeProvider>
      </HelmetProvider>
    </Fragment>
  );
};
