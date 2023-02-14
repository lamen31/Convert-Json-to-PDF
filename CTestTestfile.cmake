# CMake generated Testfile for 
# Source directory: C:/msys64/home/user
# Build directory: C:/msys64/home/user/build
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(check-assert "perl" "C:/msys64/home/user/check_assert")
set_tests_properties(check-assert PROPERTIES  _BACKTRACE_TRIPLES "C:/msys64/home/user/CMakeLists.txt;319;add_test;C:/msys64/home/user/CMakeLists.txt;0;")
subdirs("include")
subdirs("libqpdf")
subdirs("qpdf")
subdirs("libtests")
subdirs("examples")
subdirs("zlib-flate")
subdirs("manual")
subdirs("fuzz")
