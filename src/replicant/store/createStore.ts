import Store from "electron-store";

import {createSchema} from "./createSchema";

export const createStore = () => new Store({schema: createSchema()});
