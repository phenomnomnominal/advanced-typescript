# Experiment with Conditional Types and Inference!

1. Imagine you have some sort of jQuery-like library, which can either take a `string` (query selector) or a `Function` (ready event handler). If it gets a `string`, it will return an `Array<Element>`, and it it gets a `Function` it will return `null`. Write a conditional type to handle these different return types! Paste the code snippet below into a new TS file and fill in the implementations to make the type-checker happy!

   ```typescript
   import { AssertExtends } from "../../../test/assert";

   type JQuery<Input> = unknown;

   type CheckSelector = AssertExtends<Array<Element>, JQuery<"foo">>;

   type CheckEventHandler = AssertExtends<null, JQuery<() => void>>;
   ```

2. Write a conditional type that will infer the type of a Promise! It only has to unwrap one layer of promises. Paste the code snippet below into a new TS file and fill in the implementations to make the type-checker happy!

   ```typescript
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
   ```

3. Write a Conditional Template Literal Type that will split an input string given a separator character. Paste the code snippet below into a new TS file and fill in the implementations to make the type-checker happy!

```typescript
import { AssertExtends } from "./test/assert";

type Split<Input, Separator> = `` ? unknown : unknown;

type CheckSplitComma = AssertExtends<
  ['1', '234', '567'],
  Split<'1,234,567', ','>
>;

type CheckSplitUnderscore = AssertExtends<
  ['1,234', '567'],
  Split<'1,234_567', '_'>
>;

type CheckSplitNoMatch = AssertExtends<
  ['1,234,567'],
  Split<'1,234,567', '_'>
>;
```

4. Check out [this implementation](https://www.typescriptlang.org/play?#code/PQKhFgCgAIWhlAwgJQPIBl3QCqpwCQFFoAhVbXAWQEIpZo64BeF1t9jzr7lxhmONgAWASwDO0AO4iANjOgAjAKbQArgDsAtgEMR6gC6712hTKUAaaGID20fUKUAnFdudXrmlY9VmJASWh1JSUAEztbADNrOWtJADo+PgBVfVkAfTh9AE8AByUJVxV1a30rPIBjEQiRcvDoAEF4bDFLBVVSwugAcyUgxxqceDVUmRFU-ISBaAA5DLtc-OhO4pCVCO1y-Wt+icSpwgA3JyzoAAVXMSU4JQAPCv0JMcf1HPbAkrry6wMjJfUTszaEJ6LpSUT6fI5Da7KZ8c6OS6ZBYSJRjByOaDOfSqRzqJZnC5KQiORzbAA8lHyYm0PQAfNBtvjsTkzNAANrTayrSzTW76eDWHHlJQAXUmsGAUCg2TyBIRTmJpMcJG0l2gTGgAG9oE4lQAuOzeFQAXwA3NKFnLLo5FeTKWJqT0dTcIeoQhIxPp+uoupYBUKVHzeu6rF6QerQ96uvSNfbHSoAGTQFLpABiMm0+mwCzJ8OttuVqsTWvcAYN-scwugxtp5sgMpUBbSSXUzg2QhMrI1eYVJPJACJ6g6nKlvgaW23yh3TCoG-3axbZU2W7d7qEAOK9Jw1eBhn0Rns2vuOMn9ld3JSbULdLf9WqeqPzPLzusN6BNwgXq8hMkAdQ7pRBm6Hp7r60D-k4gYusGIFRn6gqVlBrohg+IIxlavZKmSAAGn5rmEADkAAkmr-pmxoEUsEQQhixGkeiSgUdh8EBgukCLioKYyGk6aZtmeRktg6HYM6yESNYCgAFaXqUAD8JZsgA0tAejQAA1koWTWBEOAiuOIw8RmWY5tgSkivSxrQAa2BSvWlqNNgnKrIJlpAShoGWKcpI5GI6FcYZfE5tqDbWZallJl51g+Wxb6zNMqieHe6BjE42gyGSABqaWqEhMGRmhEYOU5SinvFiU1MlNFpf2ljagc2VKAaWUyDl1YxZaswkHorhZHhzgOiI3xkqgOSiXlqE+pY6BKNRljICIXRCPo6FFVyJX9l1xiOL1dz9WIg3qDVJZRalboGiNlhmNRBrTbNmILUtBrzYtpQ1nWHHvpm-4pWIULCmIZIVlWbmwQVTB0Pl+4gwgCFVvJh4Fqe574TefQDBNoJzvSeoQ0DuXAdA2HQCRegRE4Mx8saRPyYQX3gpC0IA7yLrY7jsNKO9dmyog3ypOoOVksg+Q+PoPJ8mNBMY+hbJC2IIuWLT+jfRCv2M2SzPLSKnNvj2ZXKI4aR6DRxjpfCqRpRL7lwTDAaW6DPoxhDGN2zbiHQDTx7NkEX4QiEm5o+Uu6PjjMCu8D0EE9hAAMJPqGTGIa1T7sYXrTiGwYTgmzhJFmyIaXGlHzEUyzVls7b0PYQAjLH8fF-oSfw4SqcG0bmdpdnmq5-nldFxrrOh3jLvYQATDX5OJ9TKcJfr6fG+32E5645syMaw+93y-fQGH+MhthADMY8J5Tk+69Paet7i8+L44y-Gnv68lyHW+DxXAAsh91w3U+aDPF9Zwvncl55xXq-B+y1S4D3ZkPAArB-CeydT4-3PhnS+6UAFdxXtAsBm9t5DwAGxwOPggpuZ8W4oP-tfW+eDsEQOflAiuAB2QhLov6IN-uQq+gCb7AONAwmhT9cEVwABzMPrifEhSCyFzzQZQnhQj+FlzdhXAAnKI1hEj2HSI7hg40yiFGhzZBgliiEta2R1hopwgN6ERytmDJ2oEXaDw9kqL2q4ZIblvDuBxAi2HIK0f2I6eN6TQzZAE4xwoRTEPlEeLC-Y-DqHqqMMI-NJGBPZjg3xUi27pTCdvYJNiJBsgAaTcepCqaWGKXHcex9InyQ5GkMq25yiVVSulZutIFZ0x+n9fI6sN6RIEcuVsSh2ydg5mYy0PYvIiB0NtPqVIDppChM4AwDh9oAC9QhWPLgUyG0Z1T2MfNDJx75PbI3cX7TxgdvEQymf0WZO0ch7UWcs3o9h8giE2SENIXwDB6AFj2eoIRgSpCOPMgaQ0glsQ+ncmZPVwX7W+EswoqyPlfJ+bzf5JVZYixdmyCS0lNiWAxpEgAPhhGJ2wVSXEdqHHFMhAK7PxVJGSxLQK1IhlvZ20N6X6DZJXWppyXHnO-P7JpQdwwCK3ry-lkSK4AEo1GTxlsLBlbIo4ik6Uremqt-p9JZgMzlQrthpDwhc088qjr9nhG8tZnzQgIoOkdGVAqcG8u1pMwk0yHmOshdYsSezaVcocccqBziTUit9mKu8Er9wCJfrs7CAAKJVUTLjevhbtBZSLXmoo2VsxWysGZ6r7hkixJ4gkTNlD2SgIsRAshqJmEQYKs0QvUNspRuypYHNDty3ZJyhluNFVc2NoIfFevuZmp52b21BLxSUjEt1RaExAB-DBE8OWhy3jWutDbyhNpbdOttZJC06p6QDddG98kBrZAu6Az0loVKVZurer72SdW6nM1tiL239hAEdJdc0HrLS1UW3VvS+6Gq3cag2Zrvynl9YdSwf6jqXsfrcidcKv1Hp-R24U168q3qqYumay7sLADXUAtKG73ZGp3Qy+tox92gqJN+g6J6ukq3PbmKjMhS3zuI-e4DT7NR3po7JI1W96mbSnc8oa-ZgAAdI0Bl6HTPrau6WrSDtDX0fh9ls-siGrWKc8rxvuOnYU+rY361iAna6AcJgAUko9w6jNTaPQfo6kPdB7WM4fY6ezTeq0PLQIwTIjtcH1kefR5t9UmP1bUeXJ39jmlN3Si2pwLXGtP9J01vPT+EEPWaQ9AfsqXTOub4xvCzmGrP+Zs4haFXMVCAuBWMZtfnkt4Z3vbfZ4Ne0hv7WGmDrj9OXIDqOmr8pa0MZ8yxxD3Wwshgi+TBz2EADULnl7ibo4SIFIKOsLay8W3pIXaRLcKXeqLImxPuYk9B+LaQZPYa6-2dbaXl0ZdA2enLBq8sjbg77Ir9WStvdQ2Z6r47pu7qY75hbc6Ql3rWwAWi28Anbnm9ttfm8VjjGnsvBYhyzC77IrvCcJjF+7cX31Pc-Ulmdp5kcfZU0tTLnGTtM1y1KgHY3gfJatUzir23IcYeh7N2HOOQeLc5jCwkXtJCOG0DkXlgtVWMpvQS1leyyUUoLNSpQQb71q7xZrol2vYuvr7QGl1grB1jejV44ORrjvgYBjbknATk4yo1f9hGx4kbexRlsDSJX3c6fdVWlrhJusu27f14NRyhu23DQbSNHiJs3NDj2eXivldq54-Kfb7XD1dZd9xqFTW3wOQPNH-sldoDregJXF8H0ouFSaKE-oL1+ymMgEAA) of a binary expression parser. Can you follow what's going on?
