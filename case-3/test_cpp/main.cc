#include <assert.h>

#include <concat.hpp>

int main() {
  const std::string a = "Hello";
  const std::string b = "World";
  const auto ret = concat(a, b);
  assert(ret == "HelloWorld");
}
