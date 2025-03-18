import { expect } from "chai";
import { string_example } from "../lib/binding";

describe("string_example", function () {
  it("should return a hello world", function () {
    const ret = string_example("hello");
    expect(ret).to.equal("hello world");
  });
  it("should throw an error", function () {
    const x: any = 1;
    expect(() => string_example(x)).to.throw("string_example: expected a string");
  });
});
