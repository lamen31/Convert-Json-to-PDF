# CMake generated Testfile for 
# Source directory: C:/msys64/home/user/qpdf
# Build directory: C:/msys64/home/user/build/qpdf
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(qpdf "perl" "C:/msys64/home/user/run-qtest" "--disable-tc" "--top" "C:/msys64/home/user" "--bin" "C:/msys64/home/user/build/qpdf" "--bin" "C:/msys64/home/user/build/libqpdf" "--code" "C:/msys64/home/user/qpdf" "--color" "ON" "--show-on-failure" "OFF" "--tc" "C:/msys64/home/user/qpdf/*.cc" "--tc" "C:/msys64/home/user/qpdf/*.c" "--tc" "C:/msys64/home/user/libqpdf/*.cc")
set_tests_properties(qpdf PROPERTIES  _BACKTRACE_TRIPLES "C:/msys64/home/user/qpdf/CMakeLists.txt;52;add_test;C:/msys64/home/user/qpdf/CMakeLists.txt;0;")
