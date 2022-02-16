import {ReplicantName} from "../../../common/replicant/ReplicantName";
import {update as u} from "../../../common/replicant/update";
import {MappingFunction} from "../../../common/replicant/update";

export const update = <TName extends ReplicantName>(
  name: TName,
  callback: MappingFunction<TName>,
) => {
  const rep = window.api.replicant(name);
  u(rep, callback);
};
