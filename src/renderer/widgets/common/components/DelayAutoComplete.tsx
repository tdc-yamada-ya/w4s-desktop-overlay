import {Autocomplete, TextField} from "@mui/material";
import {useEffect, useState} from "react";

import {useStateWithCallback} from "./hooks/useStateWithCallback";
import {useStateWithDelay} from "./hooks/useStateWithDelay";

export const DelayAutoComplete = ({
  delay = 1000,
  getOptionLabel,
  label,
  onChange,
  options,
  value: initialValue = "",
}: {
  delay?: number;
  getOptionLabel?: (v: string) => string;
  label?: string;
  onChange?: (v: string) => void;
  options: ReadonlyArray<string>;
  value?: string;
}) => {
  const [a, setA] = useState(initialValue);
  const [b, setB] = useStateWithDelay(initialValue, delay);
  const [, setC] = useStateWithCallback(initialValue, (value) =>
    onChange?.(value ?? ""),
  );

  useEffect(() => setB(a), [a, setB]);
  useEffect(() => setC(b), [b, setC]);

  return (
    <Autocomplete
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option === value}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label={label} variant='standard' />
      )}
      onChange={(_e, value) => setA(value ?? "")}
      value={a}
    />
  );
};
