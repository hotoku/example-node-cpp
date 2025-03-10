const addon = require('../build/Release/example-node-cpp-native');

function ExampleNodeCpp(name) {
    this.greet = function(str) {
        return _addonInstance.greet(str);
    }

    var _addonInstance = new addon.ExampleNodeCpp(name);
}

module.exports = ExampleNodeCpp;
