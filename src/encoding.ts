"use strict";

export const int32ToUint8Array = (n: number): Uint8Array => {
  const bytes = new Uint8Array(4);
  for (let index = 3; index >= 0; index -= 1) {
    bytes[index] = n & 0xff;
    n >>= 8;
  }
  return bytes;
};

export const uint8ArrayToInt64 = (byteArray: Uint8Array): number => {
  let int64 = 0;
  for (const [index, byte] of byteArray.entries()) {
    int64 += byte * 2 ** (56 - index * 8);
  }
  return int64;
};

export const int64ToUint8Array = (n: number): Uint8Array => {
  const part1 = int32ToUint8Array(n / 2 ** 32);
  const part2 = int32ToUint8Array(n);
  const array = new Uint8Array(part1.length + part2.length);
  array.set(part1);
  array.set(part2, part1.length);
  return array;
};
