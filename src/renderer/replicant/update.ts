import {ReplicantName} from "../../replicant/ReplicantName";
import {update as u} from "../../replicant/update";
import {MappingFunction} from "../../replicant/update";

export const update = <TName extends ReplicantName>(
  name: TName,
  callback: MappingFunction<TName>,
) => {
  const rep = window.api.replicant(name);
  u(rep, callback);
};
