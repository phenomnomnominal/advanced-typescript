type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Exclude<T, U> = T extends U ? never : T;

type Extract<T, U> = T extends U ? T : never;

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// TS version
type NonNullable<T> = T & {};

// Mine?
type NonNullable<T> = Exclude<T, null | undefined>;

type ReturnType<Input> = Input extends (...args: Array<unknown>) => infer Return
  ? Return
  : never;

type Parameters<Input> = Input extends (...args: infer Params) => unknown
  ? Params
  : never;

type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;

type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : unknown;

type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;

type Awaited<T> =
  // special case for `null | undefined` when not in `--strictNullChecks` mode
  T extends null | undefined
    ? T
    : // `await` only unwraps object types with a callable `then`.
    // Non-object types are not unwrapped
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any }
    ? // if the argument to `then` is callable, extracts the first argument
      F extends (value: infer V, ...args: infer _) => any
      ? // recursively unwrap the value
        Awaited<V>
      : // the argument to `then` was not callable
        never
    : // non-object or non-thenable
      T;
