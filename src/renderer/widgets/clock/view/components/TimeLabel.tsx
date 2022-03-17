import {Stack, Typography} from "@mui/material";

import {DateTime} from "../../common/DateTime";

const format = (value: number) => value.toString().padStart(2, "0");

const Element = ({value}: {value: number}) => (
  <Typography
    sx={{
      fontSize: "1.5rem",
      lineHeight: 1,
    }}
  >
    {format(value)}
  </Typography>
);

const Separator = ({visible}: {visible: boolean}) => (
  <Typography
    sx={{
      fontSize: "1.5rem",
      lineHeight: 1,
      margin: "0 -0.2rem",
      visibility: visible ? "visible" : "hidden",
    }}
  >
    :
  </Typography>
);

export const TimeLabel = ({value}: {value: DateTime}) => {
  const separatorVisible = value.seconds % 2 === 0;

  return (
    <Stack direction='row' alignItems='center'>
      <Element value={value.hours} />
      <Separator visible={separatorVisible} />
      <Element value={value.minutes} />
      <Separator visible={separatorVisible} />
      <Element value={value.seconds} />
    </Stack>
  );
};
