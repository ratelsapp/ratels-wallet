import { Actor, HttpAgent } from "@dfinity/agent";

export function createBaseActor({
  canisterId,
  idlFactory,
  actorOptions,
  agent,
}: {
  canisterId: string;
  idlFactory: any;
  actorOptions?: any;
  agent: HttpAgent;
}) {
  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent?.fetchRootKey().catch((err) => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }
  return Actor.createActor(idlFactory, {
    agent: agent,
    canisterId,
    ...(actorOptions ?? {}),
  });
}
