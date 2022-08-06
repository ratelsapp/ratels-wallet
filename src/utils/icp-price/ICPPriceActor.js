import { Actor, HttpAgent } from "@dfinity/agent";
import idlFactory from "./ICPPrice.did.js";

export const canisterId = "rrkah-fqaaa-aaaaa-aaaaq-cai";

export const createActor = (canisterId, options) => {
  const agent = new HttpAgent({
    host: "https://ic0.app",
    ...options?.agentOptions,
  });

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch((err) => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};

export const ICPPriceActor = createActor(canisterId);
