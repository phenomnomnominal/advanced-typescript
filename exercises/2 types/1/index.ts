type NumUCObject = number extends Object ? true : false;
type NumLCObject = number extends object ? true : false;
type NumObjectLiteral = number extends {} ? true : false;

type NotANumberBad = NaN;
type NotANumberStillBad = typeof NaN;

const typeofHello = typeof 'hello';
type TypeofHelloBad = typeof 'hello';
const hello = 'hello';
type TypeofHelloGood = typeof hello;

class Person {
    name: string;
}
type PersonType = typeof Person;

type NullUCObject = null extends Object ? true : false;
type NullLCObject = null extends object ? true : false;
type NullObjectLiteral = null extends {} ? true : false;

type UndefinedUCObject = undefined extends Object ? true : false;
type UndefinedLCObject = undefined extends object ? true : false;
type UndefinedObjectLiteral = undefined extends {} ? true : false;

type NullUndefined = null extends undefined ? true : false;
type UndefinedNull = undefined extends null ? true : false;