#pragma once

#include <napi.h>

class ExampleNodeCpp : public Napi::ObjectWrap<ExampleNodeCpp> {
 public:
  ExampleNodeCpp(const Napi::CallbackInfo&);
  Napi::Value Greet(const Napi::CallbackInfo&);

  static Napi::Function GetClass(Napi::Env);

 private:
  std::string _greeterName;
};
