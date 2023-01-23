import { AssertExtends } from "../../../test/assert";

type Split<
  Str extends string,
  Sep extends string
> = Str extends `${infer Part1}${Sep}${infer Part2}`
  ? [Part1, ...Split<Part2, Sep>]
  : [Str];

type CheckSplitComma = AssertExtends<
  ["1", "234", "567"],
  Split<"1,234,567", ",">
>;

type CheckSplitUnderscore = AssertExtends<
  ["1,234", "567"],
  Split<"1,234_567", "_">
>;

type CheckSplitNoMatch = AssertExtends<["1,234,567"], Split<"1,234,567", "_">>;
