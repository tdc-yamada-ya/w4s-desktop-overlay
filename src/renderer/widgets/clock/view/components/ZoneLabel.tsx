import {Box, Typography} from "@mui/material";

import {formatZoneOffset, getZone} from "../../common/tz";

const defaultNameLabel = "Default Zone";
const defaultOffsetLabel = "Default Offset";

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
          fontFamily: "'Share Tech Mono'",
          fontSize: "0.8rem",
          lineHeight: 1,
          opacity: 0.7,
        }}
      >
        {value || defaultNameLabel}
      </Typography>
      <Typography
        sx={{
          fontFamily: "'Share Tech Mono'",
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
