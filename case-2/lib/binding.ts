const addon = require("../build/Release/case-2-native");

const string_example: (input: string) => string = addon.string_example;

export = {
  string_example: string_example,
};
