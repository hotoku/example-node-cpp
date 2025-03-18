#include <napi.h>

#include <iostream>

using namespace Napi;

Napi::Value string_example(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "string_example: expected a string").ThrowAsJavaScriptException();
    return env.Null();
  }
  const std::string& val = info[0].As<Napi::String>().Utf8Value();
  return Napi::String::New(env, val + " world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "string_example"), Napi::Function::New(env, string_example));
  return exports;
}

NODE_API_MODULE(addon, Init)
