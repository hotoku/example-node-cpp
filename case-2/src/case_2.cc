#include <napi.h>

#include <iostream>

using namespace Napi;

Napi::Value string_example(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  const bool isString = info[0].IsString();
  const bool isNumber = info[0].IsNumber();
  std::cout << "isString: " << isString << " isNumber: " << isNumber << std::endl;
  if (!isString) {
    Napi::TypeError::New(env, "String expected").ThrowAsJavaScriptException();
    return env.Null();
  }
  const std::string& val = info[0].As<Napi::String>().Utf8Value();
  return Napi::String::New(env, val + " added");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "string_example"), Napi::Function::New(env, string_example));
  return exports;
}

NODE_API_MODULE(addon, Init)
