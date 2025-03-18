const { expect } = require("chai");
const { string_example } = require("../dist/binding");

describe("string_example", function () {
  it("should return a hello world", function () {
    const ret = string_example("hello");
    expect(ret).to.equal("hello world");
  });
  it("should throw an error", function () {
    expect(() => string_example()).to.throw("string_example: expected a string");
  });
});
