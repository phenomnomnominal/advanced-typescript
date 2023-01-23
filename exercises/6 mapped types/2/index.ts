import { AssertExtends } from "../../../test/assert";

type ReadonlyPartial<T> = {
  readonly [P in keyof T]?: T[P] extends Record<string, unknown>
    ? ReadonlyPartial<T[P]>
    : T[P];
};

type ReadonlyPartialId = AssertExtends<
  {
    readonly id?: string;
  },
  ReadonlyPartial<{ id: string }>
>;

type ReadonlyPartialNested = AssertExtends<
  {
    readonly id?: string;
    readonly nested?: {
      readonly name?: string;
    };
  },
  ReadonlyPartial<{
    id: string;
    nested: {
      name: string;
    };
  }>
>;
