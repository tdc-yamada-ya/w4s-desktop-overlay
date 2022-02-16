import HelpIcon from "@mui/icons-material/Help";
import {Button} from "@mui/material";

export const HelpButton = () => (
  <Button startIcon={<HelpIcon />} onClick={() => window.api.help()}>
    Help
  </Button>
);
