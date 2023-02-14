# CMake generated Testfile for 
# Source directory: C:/msys64/home/user/zlib-flate
# Build directory: C:/msys64/home/user/build/zlib-flate
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(zlib-flate "perl" "C:/msys64/home/user/run-qtest" "--disable-tc" "--top" "C:/msys64/home/user" "--bin" "C:/msys64/home/user/build/zlib-flate" "--bin" "C:/msys64/home/user/build/libqpdf" "--code" "C:/msys64/home/user/zlib-flate" "--color" "ON" "--show-on-failure" "OFF")
set_tests_properties(zlib-flate PROPERTIES  _BACKTRACE_TRIPLES "C:/msys64/home/user/zlib-flate/CMakeLists.txt;4;add_test;C:/msys64/home/user/zlib-flate/CMakeLists.txt;0;")
