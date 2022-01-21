import {Button} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

export const HelpButton = () => (
  <Button startIcon={<HelpIcon />} onClick={() => window.api.help()}>
    Help
  </Button>
);
