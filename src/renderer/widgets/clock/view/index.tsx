import "@fontsource/share-tech-mono";
import "react-clock/dist/Clock.css";

import {renderRoot} from "../../../common/renderRoot";
import "../../common/styles/base";
import {App} from "./components/App";
import "./styles/style";

renderRoot(<App />, {
  themeOptions: {
    typography: {
      fontFamily: "'Share Tech Mono'",
    },
  },
});
