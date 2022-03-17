import {ThemeOptions, createTheme} from "@mui/material";
import {teal} from "@mui/material/colors";
import {useMemo} from "react";

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: teal[500],
    },
  },
  typography: {
    fontSize: 11,
    fontFamily: "'Noto Sans JP', Roboto, sans-serif",
  },
};

export const useTheme = (options?: Partial<ThemeOptions>) =>
  useMemo(() => createTheme({...defaultThemeOptions, ...options}), [options]);
