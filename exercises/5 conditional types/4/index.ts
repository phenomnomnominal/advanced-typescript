// Error Messages
type ParserErrorBase = { error: true };
type ParserError<
  Message extends string,
  Source extends string = string
> = Message & Util_FlatType<ParserErrorBase & { source: Source }>;
type Error_Unreachable = ParserError<"Assertion: Unreachable type">;
type Error_UnexpectedGenericString =
  ParserError<"Unexpected generic string type">;
type Error_Expected<
  What extends string,
  Where extends string,
  Source extends string
> = ParserError<`Expected '${What}' after '${Where}'`, Source>;

// Combine all key:value pairs in the input type
// Can be used to merge intersection types
type Util_FlatType<T> = T extends object
  ? { [K in keyof T]: Util_FlatType<T[K]> }
  : T;

// Construct an ASTNode with a type and some properties
type ASTNode<Type extends string, Props> = Util_FlatType<
  { type: Type } & Props
>;
// Construct a NumericLiteral ASTNode
type N_NumericLiteral<Value extends string> = ASTNode<
  "NumericLiteral",
  { value: Value }
>;
// Construct a BinaryExpression ASTNode
type N_BinaryExpression<Op extends string, Left, Right> = ASTNode<
  "BinaryExpression",
  { operand: Op; left: Left; right: Right }
>;

// Take an input string and ignore any leading whitespace characters
type EatWhitespaces<Source extends string> = string extends Source
  ? ParserError<"Unexpected generic string type">
  : Source extends ` ${infer Next}`
  ? EatWhitespaces<Next>
  : Source;

type ParseNumber_internal<
  Partial extends string,
  Source extends string
> = string extends Source
  ? Error_UnexpectedGenericString
  : Source extends `0${infer Next}`
  ? ParseNumber_internal<`${Partial}0`, Next>
  : Source extends `1${infer Next}`
  ? ParseNumber_internal<`${Partial}1`, Next>
  : Source extends `2${infer Next}`
  ? ParseNumber_internal<`${Partial}2`, Next>
  : Source extends `3${infer Next}`
  ? ParseNumber_internal<`${Partial}3`, Next>
  : Source extends `4${infer Next}`
  ? ParseNumber_internal<`${Partial}4`, Next>
  : Source extends `5${infer Next}`
  ? ParseNumber_internal<`${Partial}5`, Next>
  : Source extends `6${infer Next}`
  ? ParseNumber_internal<`${Partial}6`, Next>
  : Source extends `7${infer Next}`
  ? ParseNumber_internal<`${Partial}7`, Next>
  : Source extends `8${infer Next}`
  ? ParseNumber_internal<`${Partial}8`, Next>
  : Source extends `9${infer Next}`
  ? ParseNumber_internal<`${Partial}9`, Next>
  : [Partial, Source];

type ParseNumber<Source extends string> = string extends Source
  ? Error_UnexpectedGenericString
  : ParseNumber_internal<"", Source> extends ["", Source]
  ? ParserError<"Invalid number", Source>
  : ParseNumber_internal<"", Source> extends [
      `${infer Number}`,
      `${infer Next}`
    ]
  ? [N_NumericLiteral<Number>, EatWhitespaces<Next>]
  : Error_Unreachable;

// Start parsing PrimaryExpression wrapped in parens:
type ParsePrimaryExpression_parenthesized<Source extends string> =
  // If Source is`string` rather than a Literal Type, bail
  string extends Source
    ? Error_UnexpectedGenericString
    : // Parse contents of parens
      ParsePrimaryExpression_parenthesized_continue<
        ParseAdditiveExpression<Source>
      >;

type ParsePrimaryExpression_parenthesized_continue<
  Result extends [object, string] | ParserErrorBase
> = Result extends [object, string]
  ? string extends Result[1]
    ? Error_UnexpectedGenericString
    : Result[1] extends `)${infer Next}`
    ? [Result[0], EatWhitespaces<Next>]
    : Error_Expected<")", "ParenthesizedExpression", Result[1]>
  : Result;

// Start parsing PrimaryExpression
type ParsePrimaryExpression<Source extends string> = string extends Source
  ? // If Source is`string` rather than a Literal Type, bail
    Error_UnexpectedGenericString
  : Source extends `(${infer Next}`
  ? // If Source starts with `(`, take everything after the (,
    // discard leading whitespace, and parse paren contents
    ParsePrimaryExpression_parenthesized<EatWhitespaces<Next>>
  : // Otherwise just parse a number
    ParseNumber<Source>;

type ParseMultiplicativeExpression<Source extends string> =
  string extends Source
    ? Error_UnexpectedGenericString
    : ParsePrimaryExpression<Source> extends [
        infer Left,
        `*${infer PartialNext}`
      ]
    ? ParseMultiplicativeExpression<EatWhitespaces<PartialNext>> extends [
        infer Right,
        `${infer Next}`
      ]
      ? [N_BinaryExpression<"*", Left, Right>, EatWhitespaces<Next>]
      : Error_Expected<"Expression", "*", PartialNext>
    : ParsePrimaryExpression<Source> extends [
        infer Left,
        `/${infer PartialNext}`
      ]
    ? ParseMultiplicativeExpression<EatWhitespaces<PartialNext>> extends [
        infer Right,
        `${infer Next}`
      ]
      ? [N_BinaryExpression<"/", Left, Right>, EatWhitespaces<Next>]
      : Error_Expected<"Expression", "/", PartialNext>
    : ParsePrimaryExpression<Source> extends [
        infer Left,
        `%${infer PartialNext}`
      ]
    ? ParseMultiplicativeExpression<EatWhitespaces<PartialNext>> extends [
        infer Right,
        `${infer Next}`
      ]
      ? [N_BinaryExpression<"%", Left, Right>, EatWhitespaces<Next>]
      : Error_Expected<"Expression", "%", PartialNext>
    : ParsePrimaryExpression<Source>;

// Start parsing
type ParseAdditiveExpression<Source extends string> = string extends Source
  ? // If this has received `string` rather than a Literal Type, bail
    Error_UnexpectedGenericString
  : ParseMultiplicativeExpression<Source> extends [
      infer Left,
      `+${infer PartialNext}`
    ]
  ? ParseAdditiveExpression<EatWhitespaces<PartialNext>> extends [
      infer Right,
      `${infer Next}`
    ]
    ? [N_BinaryExpression<"+", Left, Right>, EatWhitespaces<Next>]
    : Error_Expected<"Expression", "+", PartialNext>
  : ParseMultiplicativeExpression<Source> extends [
      infer Left,
      `-${infer PartialNext}`
    ]
  ? ParseAdditiveExpression<EatWhitespaces<PartialNext>> extends [
      infer Right,
      `${infer Next}`
    ]
    ? [N_BinaryExpression<"-", Left, Right>, EatWhitespaces<Next>]
    : Error_Expected<"Expression", "-", PartialNext>
  : ParseMultiplicativeExpression<Source>;

type Parse_UnwrapResult<Result extends [object, string] | ParserErrorBase> =
  Result extends [object, string]
    ? // If it received the full string type,
      string extends Result[1]
      ? // Bail
        Error_UnexpectedGenericString
      : // If it received only whitespace (trailing I guess?)
      EatWhitespaces<Result[1]> extends ""
      ? // Return result
        Result[0]
      : // Else bail unexpected token:
        ParserError<"Unexpected token", Result[1]>
    : // Success:
      Result;

// Start parse
type Parse<Source extends string> = string extends Source
  ? // If this has received `string` rather than a Literal Type, bail
    Error_UnexpectedGenericString
  : // Parse everything:
    Parse_UnwrapResult<ParseAdditiveExpression<EatWhitespaces<Source>>>;

type AST = Parse<"1 + 1">;
type FancyAST = Parse<"1 * (3 * 4)">;
type Right = AST["right"];
