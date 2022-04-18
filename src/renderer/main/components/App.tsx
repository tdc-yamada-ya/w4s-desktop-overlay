import {Fragment} from "react";

import {KeepRatioSplitPane} from "./KeepRatioSplitPane";
import {MainPane} from "./MainPane";
import {OpenLayerDialog} from "./OpenLayerDialog";
import {SidePane} from "./SidePane";

export const App = () => (
  <Fragment>
    <KeepRatioSplitPane
      defaultRatio={0.25}
      maxSize={-100}
      minSize={50}
      split='vertical'
    >
      <SidePane />
      <MainPane />
    </KeepRatioSplitPane>
    <OpenLayerDialog />
  </Fragment>
);
