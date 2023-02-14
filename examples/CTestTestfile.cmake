# CMake generated Testfile for 
# Source directory: C:/msys64/home/user/examples
# Build directory: C:/msys64/home/user/build/examples
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(examples "perl" "C:/msys64/home/user/run-qtest" "--disable-tc" "--top" "C:/msys64/home/user" "--bin" "C:/msys64/home/user/build/examples" "--bin" "C:/msys64/home/user/build/qpdf" "--bin" "C:/msys64/home/user/build/libqpdf" "--code" "C:/msys64/home/user/examples" "--color" "ON" "--show-on-failure" "OFF" "--tc" "C:/msys64/home/user/examples/*.cc" "--tc" "C:/msys64/home/user/examples/*.c")
set_tests_properties(examples PROPERTIES  _BACKTRACE_TRIPLES "C:/msys64/home/user/examples/CMakeLists.txt;36;add_test;C:/msys64/home/user/examples/CMakeLists.txt;0;")
