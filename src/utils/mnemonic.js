import { blobFromUint32Array } from "@dfinity/candid";
import { entropyToMnemonic, wordlists, validateMnemonic } from "bip39";

/**
 * 生成助记词
 */
export function generate() {
  const entropy = new Uint32Array(32);
  crypto.getRandomValues(entropy);
  return entropyToMnemonic(blobFromUint32Array(entropy).toString("hex"), wordlists.english);
}

/**
 * 校验助记词
 */
export function validate(mnemonic) {
  return validateMnemonic(mnemonic);
}



