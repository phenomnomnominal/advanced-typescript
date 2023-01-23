import { AssertExtends } from "../../../test/assert";

type LettersMap = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

type UppercaseMap<Input extends string> = Input extends string
  ? Input extends `${infer First}${infer Rest}`
    ? First extends keyof LettersMap
      ? `${LettersMap[First]}${UppercaseMap<Rest>}`
      : First
    : Input
  : never;

type CheckABCDE = AssertExtends<"ABCDE", UppercaseMap<"abcde">>;

type CheckHello = AssertExtends<"HELLO", UppercaseMap<"hello">>;
