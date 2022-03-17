import {Box} from "@mui/material";
import Lottie from "lottie-react";

import bell from "../../assets/bell.json";

export const Bell = () => (
  <Box sx={{height: "120px", opacity: 0.9, width: "120px"}}>
    <Lottie animationData={bell} loop={true} />
  </Box>
);
