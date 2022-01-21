import {Typography} from "@mui/material";
import {useVersion} from "./hooks/useVersion";

export const Version = () => {
  const version = useVersion();

  return (
    <Typography
      sx={{fontSize: "0.8rem", opacity: "0.3", pointerEvents: "none"}}
    >
      {version}
    </Typography>
  );
};
