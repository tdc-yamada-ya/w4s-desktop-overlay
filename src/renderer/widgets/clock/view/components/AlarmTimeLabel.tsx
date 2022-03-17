import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import {Box, Typography} from "@mui/material";

import {AlarmTime} from "../../common/DateTime";

const color = "#F44336";
const format = (value: number) => value.toString().padStart(2, "0");

const Element = ({value}: {value: number}) => (
  <Typography
    sx={{
      color,
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
      color,
      fontSize: "1rem",
      lineHeight: 1,
      margin: "0 -0.15rem",
    }}
  >
    :
  </Typography>
);

export const AlarmTimeLabel = ({value}: {value: AlarmTime}) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        gap: "0.2rem",
      }}
    >
      <AccessAlarmsIcon sx={{color, fontSize: "0.8rem"}} />
      <Box sx={{display: "flex"}}>
        <Element value={value.hours} />
        <Separator />
        <Element value={value.minutes} />
      </Box>
    </Box>
  );
};
