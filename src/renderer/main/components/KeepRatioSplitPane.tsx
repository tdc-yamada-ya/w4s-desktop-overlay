import {Box} from "@mui/material";
import {ReactNode, useEffect, useState} from "react";
import useDimensions from "react-cool-dimensions";
import SplitPane from "react-split-pane";

export const KeepRatioSplitPane = ({
  children,
  defaultRatio = 0.5,
  minSize,
  maxSize,
  split,
}: {
  children?: ReactNode;
  defaultRatio?: number;
  minSize?: number;
  maxSize?: number;
  split?: "vertical" | "horizontal";
}) => {
  const {observe, width, height} = useDimensions();
  const [prevContainerSize, setPrevContainerSize] = useState(-1);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const containerSize = split === "vertical" ? width : height;

    if (containerSize === prevContainerSize) return;

    const ratio =
      prevContainerSize > 0 ? size / prevContainerSize : defaultRatio;
    const newSize = containerSize * ratio;
    setSize(newSize);

    setPrevContainerSize(containerSize);
  }, [defaultRatio, height, prevContainerSize, size, split, width]);

  return (
    <Box ref={observe} sx={{height: "100%", width: "100%"}}>
      <SplitPane
        minSize={minSize}
        maxSize={maxSize}
        onChange={(size) => setSize(size)}
        split={split}
        size={size}
      >
        {children}
      </SplitPane>
    </Box>
  );
};
