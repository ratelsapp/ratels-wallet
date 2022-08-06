import axios from "axios";
import { useCallback } from "react";
import { useCallsData } from "@/hooks/useCallsData";

const ROSETTA_API__BASE = "https://rosetta-api.internetcomputer.org";

export function useICPBalanceCallback(address) {
  return new Promise((resolve,reject) => {
    axios.post(ROSETTA_API__BASE + "/account/balance", {
      network_identifier: {
        blockchain: "Internet Computer",
        network: "00000000000000020101",
      },
      account_identifier: {
        address,
      },
    }).then(res => {
      resolve(res.data)
    })
  })
}

export function useICPBalanceCall(address) {
  const callback = useICPBalanceCallback();
  return useCallsData(
    useCallback(() => callback(address), [callback, address]),
    !!address
  );
}

export function useICPTransactionsCallback() {
  return useCallback((address) => {
    return axios
      .post(ROSETTA_API__BASE + "/search/transactions", {
        network_identifier: {
          blockchain: "Internet Computer",
          network: "00000000000000020101",
        },
        account_identifier: {
          address,
        },
      })
      .then((res) => {
        if (res.status === 200) return res.data;
        return {};
      });
  }, []);
}
