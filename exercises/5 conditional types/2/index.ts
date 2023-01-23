import { AssertExtends } from "../../../test/assert";

type PromiseValue<Prom extends Promise<unknown>> = Prom extends Promise<
  infer Value
>
  ? Value
  : never;

type PromiseNumber = AssertExtends<number, PromiseValue<Promise<number>>>;

type PromisePromise = AssertExtends<
  Promise<unknown>,
  PromiseValue<Promise<Promise<unknown>>>
>;
