import { Ed25519KeyIdentity } from "@dfinity/identity";
import _BigNumber from "bignumber.js";
import dayjs from "dayjs";
const { blobToHex } = require("@dfinity/candid");
const crc = require("crc");
const { sha224 } = require("./hash");
const CryptoJS = require("crypto-js");

const SUB_ACCOUNT_ZERO = Buffer.alloc(32);
const ACCOUNT_DOMAIN_SEPERATOR = Buffer.from("\x0Aaccount-id");

_BigNumber.config({
  ROUNDING_MODE: 1,
});

// import { principal_id_to_address, address_to_hex } from "@dfinity/rosetta-client";

const buffer = require("buffer/");
const crypto = require("crypto");

export const BigNumber = _BigNumber;

const InputType = (e) => {
  return "mnemonic" + (e || "");
};
async function i(e, t = [44, 223, 0, 0, 0]) {
  let [r, o] = await (async function (e) {
    const t = new TextEncoder().encode("ed25519 seed"),
      r = await window.crypto.subtle.importKey(
        "raw",
        t,
        {
          name: "HMAC",
          hash: {
            name: "SHA-512",
          },
        },
        !1,
        ["sign"]
      ),
      n = await window.crypto.subtle.sign("HMAC", r, e);
    return [new Uint8Array(n.slice(0, 32)), new Uint8Array(n.slice(32))];
  })(e);
  for (let e = 0; e < t.length; e++) {
    [r, o] = await a(r, o, 2147483648 | t[e]);
  }
  return Ed25519KeyIdentity.generate(r);
}
async function a(e, t, r) {
  const n = new Uint8Array([0, ...e, ...s(r)]),
    o = await window.crypto.subtle.importKey(
      "raw",
      t,
      {
        name: "HMAC",
        hash: {
          name: "SHA-512",
        },
      },
      !1,
      ["sign"]
    ),
    i = await window.crypto.subtle.sign("HMAC", o, n.buffer);
  return [new Uint8Array(i.slice(0, 32)), new Uint8Array(i.slice(32))];
}
function s(e) {
  const t = new Uint8Array([0, 0, 0, 0]);
  for (let r = t.length - 1; r >= 0; r--) {
    const n = 255 & e;
    t[r] = n;
    e = (e - n) / 256;
  }
  return t;
}

function crc32_add(buf) {
  const res = Buffer.allocUnsafe(4 + buf.length);
  res.writeUInt32BE(crc.crc32(buf));
  buf.copy(res, 4);
  return res;
}

function principal_id_to_address(pid) {
  return sha224([ACCOUNT_DOMAIN_SEPERATOR, pid.toUint8Array(), SUB_ACCOUNT_ZERO]);
}
function address_to_hex(addr_buf) {
  return blobToHex(crc32_add(addr_buf));
}

export function principalToAddress(principal) {
  if (!principal) return principal;
  return address_to_hex(principal_id_to_address(principal));
}

export async function mnemonicToAccount(mnemonic){
  const r = buffer.Buffer.from(mnemonic).toString("utf8");
  const o = InputType(buffer.Buffer.from([]).toString("utf8"));
  
  const identity = await i(crypto.pbkdf2Sync(r, o, 2048, 64, "sha512"))
  const principal = identity.getPrincipal();
  const principalID = principal.toString()

  const address = principalToAddress(principal);
  return {
    identity,
    principal,
    address,
    principalID
  }
}


export function encryptMnemonic(password) {
  return (mnemonic) => CryptoJS.AES.encrypt(mnemonic, password).toString();
}

export const timestampToTimes = (timestamp) => {
  if (!timestamp) return "";
  timestamp = new BigNumber(String(timestamp).substr(0, 13)).toNumber();
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};

export function dealwidthproposal(listProposals){
  const xdr_usdt = 1.43;
  if (!listProposals || !xdr_usdt || listProposals.length === 0) return;
  let priceList = [];

  for (let z of listProposals) {
    let price = z.proposal[0]?.title[0].split(" ");
    price = parseFloat(price[price.length - 1]);
    priceList.push({
      value: new BigNumber(new BigNumber(price).times(xdr_usdt || 1.42).toFixed(2)).toNumber(),
      timestamp: timestampToTimes(new BigNumber(z.proposal_timestamp_seconds.toString()).times(1000).toNumber()),
      xdr: new BigNumber(price).toFixed(2),
    });
  }
  return priceList
}
