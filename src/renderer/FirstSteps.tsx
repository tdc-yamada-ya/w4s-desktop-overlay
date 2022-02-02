import {
  Container,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {Box} from "@mui/system";

import {LayerLayoutingModeField} from "./LayerLayoutingModeInputSection";
import {LayerURLField} from "./LayerURLInputSection";

export const FirstSteps = ({id}: {id?: string}) => {
  return (
    <Container sx={{margin: "2rem auto"}} maxWidth='sm'>
      <Stepper orientation='vertical'>
        <Step active={true} expanded={true}>
          <StepLabel>Enter the Graphics URL.</StepLabel>
          <StepContent>
            <Stack spacing={1}>
              <Typography>
                In the main window, enter the URL of the web site you want to
                display in this layer window.
              </Typography>
              {id ? <LayerURLField id={id} /> : null}
            </Stack>
          </StepContent>
        </Step>
        <Step active={true} expanded={true}>
          <StepLabel>Drag layer window.</StepLabel>
          <StepContent>
            <Typography>
              Move the website to the position where you want it to overlay.
            </Typography>
          </StepContent>
        </Step>
        <Step active={true} expanded={true}>
          <StepLabel>Click close button on layer window.</StepLabel>
          <StepContent>
            <Stack spacing={2}>
              <Box>
                <Typography>
                  Close this window to finalize the position of the layer.
                </Typography>
              </Box>
              <Stack spacing={1}>
                <Typography>
                  If you want to move it again, enable the layout mode.
                </Typography>
                {id ? <LayerLayoutingModeField id={id} /> : null}
              </Stack>
            </Stack>
          </StepContent>
        </Step>
      </Stepper>
    </Container>
  );
};
