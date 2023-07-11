import {session} from "electron";

const buildPartition = (name: string) => `persist:layer-${name}`;

export const getLayerSession = (
  name: string,
  withoutSetPermission: boolean = false,
) => {
  const sess = session.fromPartition(buildPartition(name));

  if (withoutSetPermission) {
    return sess;
  }
  sess.setPermissionRequestHandler((_webContents, _permission, callback) => {
    console.log(_webContents.getURL());
    callback(false);
  });

  return sess;
};
