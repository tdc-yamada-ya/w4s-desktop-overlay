import {Box, Typography} from "@mui/material";

export const App = () => (
  <Box
    sx={{
      alignItems: "center",
      boxSizing: "border-box",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      padding: "1rem",
      textAlign: "center",
      width: "100%",
    }}
  >
    <Box
      sx={{
        alignItems: "center",
        background: "#eee",
        borderRadius: "0.5rem",
        boxSizing: "border-box",
        boxShadow: "0px 0px 0.5rem rgba(0, 0, 0, 0.5)",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "1rem",
        width: "100%",
      }}
    >
      <Typography>
        This screen displays the web page set in the <br />
        <strong>&quot;Graphics URL&quot;</strong>.
      </Typography>
    </Box>
  </Box>
);
