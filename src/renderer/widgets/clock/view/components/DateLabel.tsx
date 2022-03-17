import {Box, Typography} from "@mui/material";

import {DateTime} from "../../common/DateTime";

const format = (value: number) => value.toString().padStart(2, "0");

const Element = ({value}: {value: number}) => (
  <Typography
    sx={{
      fontSize: "1rem",
      lineHeight: 1,
    }}
  >
    {format(value)}
  </Typography>
);

const Separator = () => (
  <Typography
    sx={{
      fontSize: "1rem",
      lineHeight: 1,
      margin: "0 -0.1rem",
    }}
  >
    .
  </Typography>
);

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Weekday = ({value}: {value: number}) => (
  <Typography
    sx={{
      fontSize: "1rem",
      lineHeight: 1,
    }}
  >
    {weekdayLabels[value]}
  </Typography>
);

export const DateLabel = ({value}: {value: DateTime}) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        gap: "0.2rem",
        opacity: 0.7,
      }}
    >
      <Box sx={{alignItems: "center", display: "flex"}}>
        <Element value={value.year} />
        <Separator />
        <Element value={value.month + 1} />
        <Separator />
        <Element value={value.date} />
      </Box>
      <Weekday value={value.weekday} />
    </Box>
  );
};
