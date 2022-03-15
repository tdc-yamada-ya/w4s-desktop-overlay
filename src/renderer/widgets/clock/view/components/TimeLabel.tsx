import {Stack, Typography} from "@mui/material";

const format = (value: number) => value.toString().padStart(2, "0");

const Element = ({value}: {value: number}) => (
  <Typography
    sx={{
      fontFamily: "'Share Tech Mono'",
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
      fontFamily: "'Share Tech Mono'",
      fontSize: "1.5rem",
      lineHeight: 1,
      margin: "0 -0.2rem",
      visibility: visible ? "visible" : "hidden",
    }}
  >
    :
  </Typography>
);

export const TimeLabel = ({value}: {value: Date}) => {
  const seconds = value.getSeconds();
  const separatorVisible = seconds % 2 === 0;

  return (
    <Stack direction='row' alignItems='center'>
      <Element value={value.getHours()} />
      <Separator visible={separatorVisible} />
      <Element value={value.getMinutes()} />
      <Separator visible={separatorVisible} />
      <Element value={value.getSeconds()} />
    </Stack>
  );
};
