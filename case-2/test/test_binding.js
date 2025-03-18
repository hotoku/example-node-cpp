const Case2 = require("../dist/binding.js");
const assert = require("assert");

assert(Case2, "bindig.js should be available");

function test_string_example() {
  const result = Case2.string_example("hello");
  assert.strictEqual(result, "hello added", "Unexpected value returned");
}
function test_string_example2() {
  const result = Case2.string_example(1);
}
assert.doesNotThrow(test_string_example, undefined, "testBasic threw an expection");
assert.throws(test_string_example2, undefined, "testBasic2 did not throw an exception");

console.log("Tests passed- everything looks OK!");
