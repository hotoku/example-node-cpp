#include <napi.h>

using namespace Napi;

Napi::Value string_example(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  if (!info[0].IsString()) {
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
