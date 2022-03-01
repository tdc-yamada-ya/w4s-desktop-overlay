import {Box} from "@mui/material";
import moment from "moment";
import "moment-timezone";
import {useEffect, useState} from "react";
import Clock from "react-clock";

import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageState";
import {Preferences} from "../../common/Properties";

export const App = () => {
  const [preferences] = useLocalStorageStateAsJSON<Preferences>("preferences");
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      const m = moment();
      const n = m.tz(preferences?.zoneName ?? "", true);
      const o = n ? n.toDate() : m.toDate();
      setValue(o);
    }, 1000);

    return () => clearInterval(id);
  }, [preferences]);

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
