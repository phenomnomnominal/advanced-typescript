type FuncWithProperty = {
  (): number;
  extra: string;
};

type Void = () => void;
type VoidFunc = Void extends VoidFunction ? true : false;

const subtract = (): void {
  return 3 - 1;
}
const add: VoidFunction = (): number {
  return 1 + 3;
}
const total = add();