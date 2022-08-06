import ServiceApi from "../utils/ServiceApi";

export function sendICP(to, amount, identity, memo) {
  if (!identity) return [];
  const serviceApi = new ServiceApi(identity);
  return new Promise(async (resolve, reject) => {
    let request = {
      amount: BigInt(amount),
      to,
      fromSubAccountId: null,
    };
    try {
      if (memo) {
        request = {
          ...request,
          memo,
        };
      }
      const res = await serviceApi.sendICPTs(request);
      resolve({
        status: true,
        message: "Transfer Success",
        data: res,
      });
    } catch (e) {
      const _err = e.toString();
      const errorMessage = _err.includes("You have tried to spend more than the balance of your account")
        ? "You have tried to spend more than the balance of your account"
        : "Transfer Failed";

      reject(`Reject text: ${errorMessage}`);
    }
  });
}