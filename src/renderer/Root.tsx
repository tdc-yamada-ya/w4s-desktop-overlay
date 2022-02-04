import {Box, ThemeProvider} from "@mui/material";
import {Fragment} from "react";

import {App} from "./App";
import {useTheme} from "./hooks/useTheme";

export const Root = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            height: "100%",
          }}
        >
          <App />
        </Box>
      </ThemeProvider>
    </Fragment>
  );
};
