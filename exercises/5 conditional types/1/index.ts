import { AssertExtends } from "../../../test/assert";

type JQuery<Input extends string | (() => void)> = Input extends (
  ...args: Array<unknown>
) => unknown
  ? null
  : Input extends string
  ? Array<Element>
  : never;

type CheckSelector = AssertExtends<Array<Element>, JQuery<"foo">>;

type CheckEventHandler = AssertExtends<null, JQuery<() => void>>;
