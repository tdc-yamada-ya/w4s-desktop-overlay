import {session} from "electron";

const buildPartition = (name: string) => `persist:layer-${name}`;

export const getLayerSession = (name: string) => {
  const sess = session.fromPartition(buildPartition(name));

  sess.setPermissionRequestHandler((_webContents, _permission, callback) =>
    callback(false),
  );

  return sess;
};
