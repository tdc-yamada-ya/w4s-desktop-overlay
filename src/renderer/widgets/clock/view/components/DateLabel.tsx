import {Stack, Typography} from "@mui/material";

const format = (value: number) => value.toString().padStart(2, "0");

const Element = ({value}: {value: number}) => (
  <Typography
    sx={{
      fontFamily: "'Share Tech Mono'",
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
      fontFamily: "'Share Tech Mono'",
      fontSize: "1rem",
      lineHeight: 1,
      margin: "0 -0.1rem",
    }}
  >
    .
  </Typography>
);

export const DateLabel = ({value}: {value: Date}) => {
  return (
    <Stack sx={{opacity: 0.7}} direction='row' alignItems='center'>
      <Element value={value.getFullYear()} />
      <Separator />
      <Element value={value.getMonth() + 1} />
      <Separator />
      <Element value={value.getDate()} />
    </Stack>
  );
};
