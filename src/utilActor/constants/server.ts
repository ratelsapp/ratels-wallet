const { port, host: originHost } = require("./host");

export const localhost = `${originHost}:${port}`;
export const ICHost = "https://ic0.app";
export const LOCALHost = "http://localhost:3000";

export const network = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");

export const isIC = process.env.NODE_ENV === "production";

export const host = isIC
  ? {
      host: ICHost,
    }
  : {
      host: LOCALHost
  };
