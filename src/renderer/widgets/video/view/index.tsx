import "@fontsource/share-tech-mono";

import {renderRoot} from "../../../common/renderRoot";
import "../../common/styles/base";
import {App} from "./components/App";

renderRoot(
  <>
    <App />
  </>,
  {
    themeOptions: {
      typography: {
        fontFamily: "'Share Tech Mono'",
      },
    },
  },
);
