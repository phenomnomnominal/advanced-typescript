import { AssertExtends } from "../../../test/assert";

type Days = "Mon" | "Tues" | "Wednes" | "Thurs" | "Fri" | "Satur" | "Sun";
type DaysOfWeek = `${Days}day`;

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
> = `(+${CountryCode}) ${Number}`;

type CheckNZNumber = AssertExtends<
  "(+64) 20 400 34557",
  PhoneNumber<64, "20 400 34557">
>;

type Echo<
  Yell extends string,
  LowerYell extends string = Lowercase<Yell>
> = `${Uppercase<LowerYell>}! ${Capitalize<LowerYell>}! ${LowerYell}...`;

type CheckEcho = AssertExtends<"HELLO! Hello! hello...", Echo<"hElLo">>;

type Digits = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type EightNineNineNineNine = `${
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"}${Digits}${Digits}${Digits}${Digits}`;
