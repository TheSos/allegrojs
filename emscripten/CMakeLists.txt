cmake_minimum_required(VERSION 3.5)

project("AllegroTS Emscripten Examples")

set(HASEMSCRIPTEN "not using emscripten")
if(EMSCRIPTEN)
  set(HASEMSCRIPTEN "using emscripten")
endif(EMSCRIPTEN)

message("Building examples, ${HASEMSCRIPTEN}")

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Project and out dir
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build)

# Executable
file(GLOB EXAMPLE_SOURCES ${CMAKE_BINARY_DIR}/*.c )

foreach(sourcefile ${EXAMPLE_SOURCES})
  # Remove path and extension
  file(RELATIVE_PATH sourcefile ${CMAKE_CURRENT_SOURCE_DIR} ${sourcefile})
  string( REPLACE ".c" "" sourcefile ${sourcefile} )

  # Log
  message("Configuring example ${sourcefile}")

  # Create executable
  add_executable(${sourcefile} ${sourcefile}.c)

  # Compile options
  target_compile_options(${sourcefile} PUBLIC -Wall -Wextra -pedantic -O2)

  # Link
  if(EMSCRIPTEN)
    set(CMAKE_EXECUTABLE_SUFFIX ".html")
    target_compile_options(
      ${sourcefile} 
      PUBLIC 
      --pre-js ./build/allegro.library.js
    )
    set_target_properties(
      ${sourcefile}
      PROPERTIES 
      LINK_FLAGS 
      "--pre-js ./build/allegro.library.js --js-library ./build/allegro.library.js --js-library library.js -sASYNCIFY -sASYNCIFY_IMPORTS=['rest','allegro_ready','readkey','load_sample'] -sEXPORTED_FUNCTIONS=['_malloc','_main']" 
    )

  else(EMSCRIPTEN)
    if(MINGW)
      target_link_libraries(${sourcefile} -lmingw32)
    endif(MINGW)
    find_library(ALLEGRO_LIBRARY NAMES liballeg44.dll.a liballeg.dll.a liballeg.so liballeg.dylib)
    find_library(ALLEGRO_PNG_LIBRARY NAMES libloadpng.dll.a libloadpng.so libloadpng.dylib)
    target_link_libraries(${sourcefile} -lm ${ALLEGRO_LIBRARY})
    target_link_libraries(${sourcefile} -lm ${ALLEGRO_PNG_LIBRARY})
  endif(EMSCRIPTEN)
endforeach(sourcefile ${EXAMPLE_SOURCES})
