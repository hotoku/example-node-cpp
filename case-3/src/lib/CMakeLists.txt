file(GLOB SOURCE_FILES "./*.cpp")

add_library(case3lib STATIC ${SOURCE_FILES})

target_include_directories(case3lib PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
