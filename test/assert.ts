export type AssertExtends<
  SuperType,
  Subtype extends SuperType
> = Subtype extends SuperType ? Subtype : never;

type TestTrue = AssertExtends<Object, true>;
type TestNever = AssertExtends<object, never>;

type TestFalseString = AssertExtends<false, string>;
