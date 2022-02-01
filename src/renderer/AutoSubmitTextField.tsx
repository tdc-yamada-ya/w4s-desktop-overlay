import {TextField} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";

const useTimeout = (callback: () => void, timeout: number) => {
  const ref = useRef(0);

  useEffect(() => {
    if (callback == null) return;

    ref.current = window.setTimeout(callback, timeout);

    return () => clearTimeout(ref.current);
  }, [callback, timeout]);
};

export const AutoSubmitTextField = ({
  value: currentValue,
  helperText,
  label,
  onSubmit,
  placeholder,
  delay = 1000,
}: {
  value?: string;
  helperText?: string;
  label?: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
  delay?: number;
}) => {
  const [value, setValue] = useState("");

  const submitInternal = useCallback(() => {
    if (value === currentValue) return;
    onSubmit(value);
  }, [currentValue, onSubmit, value]);

  useEffect(() => setValue(currentValue ?? ""), [currentValue]);
  useTimeout(submitInternal, delay);

  return (
    <form
      style={{width: "100%"}}
      onSubmit={(e) => {
        e.preventDefault();
        submitInternal();
        return false;
      }}
    >
      <TextField
        sx={{width: "100%"}}
        label={label}
        value={value}
        variant='standard'
        helperText={helperText}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => submitInternal()}
        placeholder={placeholder}
      />
    </form>
  );
};
