import { HttpAgent } from "@dfinity/agent";
import ledgerBuilder from "./canisters/builder";
import errorLogger from "./errorLogger";
export const HOST = "https://nns.ic0.app/";

class ServiceApi {
  constructor(identity){
    const agent = new HttpAgent({
      host: HOST,
      identity,
    });
    this.ledgerService = ledgerBuilder(agent, identity);
    this.sendICPTs = (request) => {
      return errorLogger.executeWithLogging(() => this.ledgerService.sendICPTs(request));
    };
    
  }
}

export default ServiceApi;