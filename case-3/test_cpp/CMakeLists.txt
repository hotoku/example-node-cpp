file(GLOB SOURCE_FILES "./*.cc")

add_executable(${PROJECT_NAME}_test ${SOURCE_FILES})
target_include_directories(${PROJECT_NAME}_test PUBLIC ${PROJECT_SOURCE_DIR}/src)
target_link_libraries(${PROJECT_NAME}_test ${PROJECT_NAME})
