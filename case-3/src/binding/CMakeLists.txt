file(GLOB SOURCE_FILES "./*.cc")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_include_directories(${PROJECT_NAME} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/../lib)
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} case3lib)
