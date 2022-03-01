import {Box, Stack, Typography} from "@mui/material";
import {ReactNode} from "react";

const Title = ({children}: {children: ReactNode}) => (
  <Typography sx={{fontSize: "0.8rem", fontWeight: 800}}>{children}</Typography>
);

const Description = ({children}: {children: ReactNode}) => (
  <Typography sx={{fontSize: "0.8rem", opacity: 0.5}}>{children}</Typography>
);

export const InputSection = ({
  children,
  description,
  label,
}: {
  children: ReactNode;
  description?: ReactNode;
  label?: ReactNode;
}) => (
  <Stack spacing={1}>
    <Stack spacing={0.3}>
      <Title>{label}</Title>
      <Description>{description}</Description>
    </Stack>
    <Box>{children}</Box>
  </Stack>
);
