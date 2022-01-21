import {API} from "../bridge";

declare global {
  interface Window {
    api: API;
  }
}
