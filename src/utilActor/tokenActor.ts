import { Actor } from './Actor'
import { idlFactory } from 'utilActor/did/ext/extDid'

export const extNFTTokenActor = (canisterId: any, host: any) => Actor.create({
  canisterId,
  idlFactory: idlFactory,
  host
})