import RequestConverters from "./RequestConverters";
import {submitUpdateRequest} from "./updateRequestHandler";
const types_pb = require("./proto/types_pb");
export default class Service {
  constructor(agent, canisterId, myPrincipal) {
    this.agent = agent;
    this.canisterId = canisterId;
    this.myPrincipal = myPrincipal;
    this.requestConverters = new RequestConverters();
    this.sendICPTs = async (request) => {
      const rawRequest = this.requestConverters.fromSendICPTsRequest(request);
      const responseBytes = await submitUpdateRequest(
        this.agent,
        this.canisterId,
        "send_pb",
        rawRequest.serializeBinary()
      );
      return BigInt(types_pb.BlockHeight.deserializeBinary(responseBytes).getHeight());
    };
  }
}