# Try out Generics and Template Literal Types!

1. Given the semantics defined by the [`React` documentation](https://beta.reactjs.org/reference/react/useState#usestate), have a go at implementing a generic type that represents `useState`!

2. Have a go constructing some string and unions with Template Literal Types. Paste the code snippet below into a new TS file and fill in the implementations to make the type-checker happy!

   ```typescript
   import { AssertExtends } from "../../test/assert";

   type DaysOfWeek = `${string}${string}`;

   type CreateDaysOfWeek = AssertExtends<
     | "Monday"
     | "Tuesday"
     | "Wednesday"
     | "Thursday"
     | "Friday"
     | "Saturday"
     | "Sunday",
     DaysOfWeek
   >;

   type PhoneNumber<
     CountryCode extends number,
     Number extends string
   > = `${string}`;

   type CheckNZNumber = AssertExtends<
     "(+64) 20 400 34557",
     PhoneNumber<64, "20 400 34557">
   >;

   type Echo<Yell> = ``;

   type CheckEcho = AssertExtends<"HELLO! Hello! hello...", Echo<"hElLo">>;
   ```

> Bonus points for figuring out what the maximum union size is in TypeScript!

3. Have a hunt through the TypeScript lib files (`node_modules/typescript/lib/lib.*.d.ts`) and find the implementations for `Uppercase`, `Lowercase`, `Capitalize` and `Uncapitalize`. What do you think is going on there?
