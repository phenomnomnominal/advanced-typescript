# Play with all the foundational types we've been talking about!

1. Try to build up some intuition about how Literal Types and Primitive Types work together. Try out the `typeof` operator, and compare how it works in JavaScript to how it works in TypeScript! Do `null` and `undefined` make sense?

> You might want to try out the `type Foo = A extend B ? true : false` syntax to check stuff!
>
> You can either make a random TS file in your IDE and play there, or you might want to try the [TypeScript Playground](https://www.typescriptlang.org/play), which makes it super easy to mess around and see what the results are!

2. Investigate `Object`, `object` and `{}`. Can you find any differences between them? Feel free to Google! Does the differences make sense?

3. Explore `Array` and `Tuple` types! Can you think of some use-cases where you might want one over the other? What about `ReadonlyArray<T>`?

4. Dig into `Function` types. Since functions in JavaScript are still objects, they can have arbitrary properties assigned to them! How would you declare that in TypeScript? What is `void` and how does it work?

5. How does "Structural Typing" work with all these types? Does it work how you'd expect, or is it a bit counterintuitive sometimes?
