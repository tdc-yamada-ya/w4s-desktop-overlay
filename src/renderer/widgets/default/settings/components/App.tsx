import {Box, Typography} from "@mui/material";
import {Fragment} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

export const App = () => (
  <HelmetProvider>
    <Fragment>
      <Helmet>
        <title>Built-in Default Widget Settings</title>
      </Helmet>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          p: 4,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography>
          This screen displays the web page set in the <br />
          <strong>&quot;Settings URL&quot;</strong>.
        </Typography>
      </Box>
    </Fragment>
  </HelmetProvider>
);
