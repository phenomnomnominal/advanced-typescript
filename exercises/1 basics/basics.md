# Play with `tsc` the TypeScript compiler and type-checker!

1. Find a vanilla JavaScript library (on npm or Github) and run TypeScript on the JavaScript source. Does it pass the type-checker? How many issues are found? How does that change if you use difference compiler flags?

> You can use `npm run compile` to trigger `tsc` with no flags. To compile a file, try `npm run compile -- ./path/to/file.ts`, and then pass some compiler flags. More information about `tsc` [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

2. Explore the different TypeScript lib files (`node_modules/typescript/lib/lib.*.d.ts`). Find some types that you don't understand and would like to learn more about today!

3. Try out a few different `--target` options and see how TypeScript transpiles different bits of code. What other structures can you find that generate interesting output?

   > Bonus points to whoever can get the biggest ratio from lines of TS to lines out emitted JS!
