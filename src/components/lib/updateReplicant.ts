import {updateReplicant as update} from "../../replicant/updateReplicant";
import {ReplicantMap, ReplicantName} from "../../replicant/replicants";

export const updateReplicant = <TName extends ReplicantName>(
  name: TName,
  f: (o: ReplicantMap[TName] | undefined) => ReplicantMap[TName],
) => update(window.api.replicant(name), f);
