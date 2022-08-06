import { createBaseActor } from "./BaseActor";
import { HttpAgent } from "@dfinity/agent";
import { host as defaultHost } from "./constants/server";
import { WalletType } from "./constants/walletType";
// import { createPlugAgent } from "hooks/plug";

export enum ACTOR_TYPE {
  SWAP = "swap",
  PLUG = "plug",
  STOIC = "stoic"
}

export class Actor {
  static async create({
    canisterId,
    idlFactory,
    host,
    identity,
    walletType
  }: {
    canisterId: string;
    idlFactory: any;
    host?: string;
    identity?: any;
    walletType?: string
  }): Promise<any> {
    console.log(host, '--host')
    const anonymousAgent = new HttpAgent({
      ...(host ? { host } : defaultHost),
    });

    if (walletType === WalletType.PLUG){

    }
    let actor = createBaseActor({
    canisterId,
    idlFactory,
    agent: identity
        ? new HttpAgent({
            ...(host ? { host } : defaultHost),
            identity,
        })
        : anonymousAgent,
    });

    return actor;
  }
}
