import {Box, ThemeProvider} from "@mui/material";

import {App} from "./App";
import {Version} from "./Version";
import {useTheme} from "./hooks/useTheme";

export const Root = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <App />
        <Box sx={{top: "0.5rem", right: "0.5rem", position: "fixed"}}>
          <Version />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
