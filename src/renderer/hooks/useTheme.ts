import {createTheme} from "@mui/material";
import {teal} from "@mui/material/colors";
import {useMemo} from "react";

export const useTheme = () => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: teal[500],
          },
        },
        typography: {
          fontSize: 12,
          fontFamily: "'Noto Sans JP', Roboto, sans-serif;",
        },
      }),
    [],
  );

  return theme;
};
