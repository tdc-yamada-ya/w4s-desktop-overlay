import {
  Button,
  Container,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import {LayerLayoutingModeField} from "./LayerLayoutingModeInputSection";
import {LayerURLField} from "./LayerURLInputSection";
import {useUpdateLayerLayoutingMode} from "./hooks/useUpdateLayerLayoutingMode";

export const FinishLayerLayoutingButton = ({id}: {id?: string}) => {
  const update = useUpdateLayerLayoutingMode(id);

  return (
    <Button variant='contained' onClick={() => update(false)}>
      Finish
    </Button>
  );
};

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
          <StepLabel>Finish layout.</StepLabel>
          <StepContent>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography>
                  Close the window or click follwing button to finalize the
                  position of the layer.
                </Typography>
                <Stack direction='row'>
                  {id ? <FinishLayerLayoutingButton id={id} /> : null}
                </Stack>
              </Stack>
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
