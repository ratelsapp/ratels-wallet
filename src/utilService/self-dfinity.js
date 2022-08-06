const assert = require("assert").strict;
const crc = require("crc");
const { blobFromHex } = require("@dfinity/candid");

function crc32_del(buf) {
  const res = buf.subarray(4);
  assert(crc.crc32(res) === buf.readUInt32BE(0));
  return res;
}

function bufferFromArrayBufferView(buf) {
  return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
}

function address_from_hex(hex_str) {
  const buf = bufferFromArrayBufferView(blobFromHex(hex_str));
  assert(buf.byteLength === 32);
  return crc32_del(buf);
}

export {
  address_from_hex
}