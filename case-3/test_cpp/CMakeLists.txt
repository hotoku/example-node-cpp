file(GLOB SOURCE_FILES "./*.cpp")

add_executable(${PROJECT_NAME}_test ${SOURCE_FILES})
target_link_libraries(${PROJECT_NAME}_test case3lib)
