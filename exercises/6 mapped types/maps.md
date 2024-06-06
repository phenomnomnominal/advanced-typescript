# Magic with Mapped Types!

1. Let's think back to the "Intrinsic String Types" like "Uppercase" and "Lowercase"... Is it possible to implement them with Mapped types? What might that look like? Paste the code snippet below into a new TS file and fill in the implementations to make the type-checker happy!

   ```typescript
   import { AssertEquals } from "../../test/assert";

   type UppercaseMap<Input> = unknown;

   type CheckABCDE = AssertEquals<"ABCDE", UppercaseMap<"abcde">>;

   type CheckHello = AssertEquals<"HELLO", UppercaseMap<"hello">>;
   ```

   > Bonus points if you can come up with a good reason why they _didn't_ do it like this?

2. We saw how we can remove a modifier with a Mapped Type, but how about adding some? Write a mapped type that takes an object and makes all properties optional _and_ readonly! Paste the code snippet below into a new TS file and fill in the implementations to make the type-checker happy!

   ```typescript
   import { AssertEquals } from "../../test/assert";

   type ReadonlyPartial<T> = unknown;

   type ReadonlyPartialId = AssertEquals<
     {
       readonly id?: string;
     },
     ReadonlyPartial<{ id: string }>
   >;
   ```

   > Bonus points if you can make it recursive for nested objects!

   ```typescript
   type ReadonlyPartialNested = AssertEquals<
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
   ```

```

```
