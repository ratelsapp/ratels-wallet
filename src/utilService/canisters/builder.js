import { Principal } from "@dfinity/principal";
import Service from "./Service";

const canisterId = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
export default function default_1(agent, identity) {
  return new Service(agent, canisterId, identity.getPrincipal());
}
