import { blobToUint8Array, numberToArrayBuffer } from './utils'
const buffer_1 = require("buffer");
const types_pb_1 = require("./proto/types_pb");
export const TRANSACTION_FEE = BigInt(10000);

export default class RequestConverters {
  constructor() {
    this.fromSendICPTsRequest = (request) => {
      const result = new types_pb_1.SendRequest();
      const accountIdentifier = this.fromAccountIdentifier(request.to);
      result.setTo(accountIdentifier);
      const maxFee = this.toICPTs(request.fee === undefined ? TRANSACTION_FEE : request.fee);
      result.setMaxFee(maxFee);
      if (request.memo != null) {
        const memo = new types_pb_1.Memo();
        memo.setMemo(request.memo.toString());
        result.setMemo(memo);
      }
      const payment = new types_pb_1.Payment();
      payment.setReceiverGets(this.toICPTs(request.amount));
      result.setPayment(payment);
      if (request.blockHeight != null) {
        const createdAt = new types_pb_1.BlockHeight();
        createdAt.setHeight(request.blockHeight.toString());
        result.setCreatedAt();
      }
      if (request.fromSubAccountId != null) {
        result.setFromSubaccount(this.subAccountIdToSubaccount(request.fromSubAccountId));
      }
      return result;
    };
    this.fromAccountIdentifier = (hexString) => {
      const accountIdentifier = new types_pb_1.AccountIdentifier();
      accountIdentifier.setHash(Uint8Array.from(buffer_1.Buffer.from(hexString, "hex")));
      return accountIdentifier;
    };
    this.toICPTs = (amount) => {
      const result = new types_pb_1.ICPTs();
      result.setE8s(amount.toString(10));
      return result;
    };
  }
}