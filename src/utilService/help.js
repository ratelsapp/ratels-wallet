import _BigNumber from "bignumber.js";
import { Ed25519KeyIdentity } from "@dfinity/identity";
const { address_from_hex } = require('./self-dfinity')
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const buffer = require("buffer/");

_BigNumber.config({
  ROUNDING_MODE: 1,
});
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

export const BigNumber = _BigNumber;

export function decryptMnemonic(password) {
  return (mnemonic) => CryptoJS.AES.decrypt(mnemonic, password).toString(CryptoJS.enc.Utf8);
}

export function getMnemonic(password,mnemonic) {
  if (!password) return null;

  let res = null;
  try {
    // TODO fix mnemonic decrypt utf-8 error
    res = decryptMnemonic(password)(mnemonic);
  } catch (err) {
    console.log(err);
  }

  return res;
}

export function mnemonicToSeedSync(e, t = []) {
  const r = buffer.Buffer.from(e).toString("utf8");
  const o = InputType(buffer.Buffer.from(t).toString("utf8"));
  return i(crypto.pbkdf2Sync(r, o, 2048, 64, "sha512"));
}

export function isValidAddress(address) {
  let valid = true;
  try {
    address_from_hex(address);
  } catch (err) {
    valid = false;
  }
  return valid;
}