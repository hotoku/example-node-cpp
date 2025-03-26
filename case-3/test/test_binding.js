const string_example = require("../dist/binding.js");
const assert = require("assert");

assert(string_example, "The expected function is undefined");

function testBasic() {
  const result = string_example("hello");
  assert.strictEqual(result, "hello world", "Unexpected value returned");
}

assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
