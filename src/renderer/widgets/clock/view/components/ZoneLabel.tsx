import {Box, Typography} from "@mui/material";

import {formatZoneOffset, getZone} from "../../common/tz";

const defaultNameLabel = "";
const defaultOffsetLabel = "";

export const ZoneLabel = ({value}: {value?: string}) => {
  const offsetLabel =
    (value && formatZoneOffset(getZone(value)?.offset)) || defaultOffsetLabel;

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.8rem",
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        {value || defaultNameLabel}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.8rem",
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        {offsetLabel}
      </Typography>
    </Box>
  );
};
