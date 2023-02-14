# CMake generated Testfile for 
# Source directory: C:/msys64/home/user/libtests
# Build directory: C:/msys64/home/user/build/libtests
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(libtests "perl" "C:/msys64/home/user/run-qtest" "--disable-tc" "--top" "C:/msys64/home/user" "--bin" "C:/msys64/home/user/build/libtests" "--bin" "C:/msys64/home/user/build/qpdf" "--code" "C:/msys64/home/user/libtests" "--color" "ON" "--show-on-failure" "OFF" "--tc" "C:/msys64/home/user/libtests/*.cc" "--tc" "C:/msys64/home/user/libqpdf/*.cc" "--tc" "C:/msys64/home/user/libqpdf/qpdf/bits_functions.hh")
set_tests_properties(libtests PROPERTIES  _BACKTRACE_TRIPLES "C:/msys64/home/user/libtests/CMakeLists.txt;53;add_test;C:/msys64/home/user/libtests/CMakeLists.txt;0;")
