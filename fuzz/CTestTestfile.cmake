# CMake generated Testfile for 
# Source directory: C:/msys64/home/user/fuzz
# Build directory: C:/msys64/home/user/build/fuzz
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(fuzz "perl" "C:/msys64/home/user/run-qtest" "--disable-tc" "--env" "QPDF_FUZZ_CORPUS=C:/msys64/home/user/build/fuzz/qpdf_corpus" "--top" "C:/msys64/home/user" "--bin" "C:/msys64/home/user/build/fuzz" "--bin" "C:/msys64/home/user/build/qpdf" "--code" "C:/msys64/home/user/fuzz" "--color" "ON" "--show-on-failure" "OFF")
set_tests_properties(fuzz PROPERTIES  _BACKTRACE_TRIPLES "C:/msys64/home/user/fuzz/CMakeLists.txt;136;add_test;C:/msys64/home/user/fuzz/CMakeLists.txt;0;")
