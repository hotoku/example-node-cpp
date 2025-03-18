const addon = require("../build/Release/example-node-cpp-native");

interface IExampleNodeCppNative {
  greet(strName: string): string;
}

class ExampleNodeCpp {
  constructor(name: string) {
    this._addonInstance = new addon.ExampleNodeCpp(name);
  }

  greet(strName: string) {
    return this._addonInstance.greet(strName);
  }

  // private members
  private _addonInstance: IExampleNodeCppNative;
}

const ExampleNodeCpp2: (s: string) => string = addon.ExampleNodeCpp2;

export = {
  ExampleNodeCpp,
  ExampleNodeCpp2,
};
