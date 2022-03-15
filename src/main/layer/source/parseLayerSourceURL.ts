import {LayerSource} from "./LayerSource";

const httpPattern = /^https?:\/\/(.+)$/;
const builtinPattern = /^builtin:\/\/([^/]+)\/(.+)$/;

export const parseLayerSourceURL = (url?: string): LayerSource => {
  if (url?.match(httpPattern)) {
    return {
      type: "url",
      value: url,
    };
  }

  const b = url?.match(builtinPattern);
  if (b) {
    const widget = b[1];
    const file = b[2];
    return {
      type: "file",
      value: `dist/renderer/widgets/${widget}/${file}.html`,
    };
  }

  return {
    type: "url",
    value: "about:blank",
  };
};
