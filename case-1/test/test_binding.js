const binding = require("../dist/binding.js");
const assert = require("assert");

const ExampleNodeCpp = binding.ExampleNodeCpp;
const ExampleNodeCpp2 = binding.ExampleNodeCpp2;

assert(ExampleNodeCpp, "The expected module is undefined");
assert(ExampleNodeCpp2, "The expected function is undefined");

function testBasic() {
  const instance = new ExampleNodeCpp("mr-yeoman");
  assert(instance.greet, "The expected method is not defined");
  assert.strictEqual(instance.greet("kermit"), "mr-yeoman", "Unexpected value returned");
}

function testInvalidParams() {
  const instance = new ExampleNodeCpp();
}

assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");
assert.throws(testInvalidParams, undefined, "testInvalidParams didn't throw");

function testBasic2() {
  const result = ExampleNodeCpp2("hello");
  assert.strictEqual(result, "world", "Unexpected value returned");
}

assert.doesNotThrow(testBasic2, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
