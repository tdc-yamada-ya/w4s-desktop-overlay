import {ReplicantMap} from "../../replicant/ReplicantMap";
import {ReplicantName} from "../../replicant/ReplicantName";
import {updateReplicant as update} from "../../replicant/updateReplicant";

export const updateReplicant = <TName extends ReplicantName>(
  name: TName,
  f: (o: ReplicantMap[TName] | undefined) => ReplicantMap[TName],
) => update(window.api.replicant(name), f);
