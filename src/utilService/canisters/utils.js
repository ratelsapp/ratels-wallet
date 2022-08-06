const buffer = require("buffer/");
export const uint8ArrayToBlob = (array) => {
  return buffer.Buffer.from(array);
};

export const blobToUint8Array = (blob) => {
  return buffer.Buffer.from(blob);
};

export const numberToArrayBuffer = (value, byteLength) => {
  const buffer = new ArrayBuffer(byteLength);
  new DataView(buffer).setUint32(byteLength - 4, value);
  return buffer;
};