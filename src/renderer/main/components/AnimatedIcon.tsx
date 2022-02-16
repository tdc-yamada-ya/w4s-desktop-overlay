import {Box} from "@mui/system";

import icon from "../../../../assets/icon-animated.svg";

export const AnimatedIcon = ({
  height = "16rem",
  width = "16rem",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${icon})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height,
        width,
      }}
    />
  );
};
