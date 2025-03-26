const Case3 = require("../dist/binding.js");
const assert = require("assert");

assert(Case3, "The expected function is undefined");

function testBasic()
{
    const result =  Case3("hello");
    assert.strictEqual(result, "world", "Unexpected value returned");
}

assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");