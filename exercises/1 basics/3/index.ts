async function* foo() {
  yield 1;
  yield 2;
}
(async function () {
  for await (const num of foo()) {
    console.log(num);
    break;
  }
})();
