import { uint8ArrayToBlob, blobToUint8Array } from './utils'
export const submitQueryRequest = async (agent, canisterId, methodName, bytes) => {
  const arg = uint8ArrayToBlob(bytes);
  const queryResponse = await agent.query(canisterId, {
    methodName,
    arg,
  });
  if (queryResponse.status === "rejected" /* Rejected */) {
    throw new Error(
      [
        "Call failed:",
        `  Method: ${methodName}`,
        `  Canister ID: ${canisterId}`,
        `  HTTP status code: ${queryResponse.reject_code}`,
        `  HTTP status text: ${queryResponse.reject_message}`,
      ].join("\n")
    );
  }
  return blobToUint8Array(queryResponse.reply.arg);
};
export default {
  submitQueryRequest,
};
