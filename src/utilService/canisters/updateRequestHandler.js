const agent_1 = require("@dfinity/agent");
import { uint8ArrayToBlob, blobToUint8Array } from './utils'
export const submitUpdateRequest = async (agent, canisterId, methodName, bytes) => {
  const pollStrategy = agent_1.polling.defaultStrategy();
  const arg = uint8ArrayToBlob(bytes);
  console.log(arg, bytes, "arg");
  const submitResponse = await agent.call(canisterId, {
    methodName,
    arg,
    effectiveCanisterId: canisterId,
  });
  if (!submitResponse.response.ok) {
    throw new Error(
      [
        "Call failed:",
        `  Method: ${methodName}`,
        `  Canister ID: ${canisterId}`,
        `  Request ID: ${submitResponse.requestId}`,
        `  HTTP status code: ${submitResponse.response.status}`,
        `  HTTP status text: ${submitResponse.response.statusText}`,
      ].join("\n")
    );
  }
  const blob = await agent_1.polling.pollForResponse(agent, canisterId, submitResponse.requestId, pollStrategy);
  return blobToUint8Array(blob);
};