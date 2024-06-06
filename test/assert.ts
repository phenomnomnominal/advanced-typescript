type Equals<X, Y> = 
  (<T>() => T extends X ? 1 : 2) extends 
  (<T>() => T extends Y ? 1 : 2)
    ? X
    : never;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type AssertEquals<X, Y extends Equals<X, Y>> = 
  X extends Equals<X, Y> 
    ? X
    : { X: Prettify<X>, Y: Prettify<Y>, message: `X is not equal to Y` };

type TestEqualsOneThree = AssertEquals<1, 3>; // never
type TestEqualsOneOne = AssertEquals<1, 1>; // 1