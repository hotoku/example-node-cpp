cmake_minimum_required(VERSION 3.22)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

project(case-3 CXX)
set(CMAKE_CXX_STANDARD 17)

add_definitions(-DNAPI_VERSION=9)

include_directories(${CMAKE_JS_INC})

add_subdirectory(src)
add_subdirectory(test_cpp)


# add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
# set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
# target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
#   # Generate node.lib
#   execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
# endif()
