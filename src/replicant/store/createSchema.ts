import {Schema} from "electron-store";
import {ReplicantMap} from "../ReplicantMap";

const bounds = {
  type: "object",
  properties: {
    x: {
      type: "number",
    },
    y: {
      type: "number",
    },
    width: {
      type: "number",
    },
    height: {
      type: "number",
    },
  },
} as const;

export const createSchema = (): Schema<ReplicantMap> => ({
  overlay: {
    type: "object",
    additionalProperties: {
      type: "object",
      properties: {
        bounds,
        display: {
          type: "number",
        },
        url: {
          type: "string",
        },
        screen: {
          type: "number",
        },
        visible: {
          type: "boolean",
        },
      },
    },
  },
  screen: {
    type: "object",
    properties: {
      displays: {
        type: "array",
        items: {
          type: "object",
          properties: {
            bounds,
          },
        },
      },
    },
  },
});
