import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import Clock from "react-clock";

export const App = () => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#ccc",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Clock value={value} />
      </Box>
    </Box>
  );
};
