import {createTheme} from "@mui/material";
import {useMemo} from "react";

export const useTheme = () => {
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontSize: 12,
          fontFamily: "'Noto Sans JP', Roboto, sans-serif;",
        },
      }),
    [],
  );

  return theme;
};
