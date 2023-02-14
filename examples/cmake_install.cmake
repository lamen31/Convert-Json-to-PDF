# Install script for directory: C:/msys64/home/user/examples

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "C:/Program Files (x86)/xz")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "RelWithDebInfo")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "C:/msys64/mingw64/bin/objdump.exe")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "examples" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/doc/qpdf/examples" TYPE FILE FILES
    "C:/msys64/home/user/examples/pdf-attach-file.cc"
    "C:/msys64/home/user/examples/pdf-bookmarks.cc"
    "C:/msys64/home/user/examples/pdf-c-objects.c"
    "C:/msys64/home/user/examples/pdf-count-strings.cc"
    "C:/msys64/home/user/examples/pdf-create.cc"
    "C:/msys64/home/user/examples/pdf-custom-filter.cc"
    "C:/msys64/home/user/examples/pdf-double-page-size.cc"
    "C:/msys64/home/user/examples/pdf-filter-tokens.cc"
    "C:/msys64/home/user/examples/pdf-invert-images.cc"
    "C:/msys64/home/user/examples/pdf-linearize.c"
    "C:/msys64/home/user/examples/pdf-mod-info.cc"
    "C:/msys64/home/user/examples/pdf-name-number-tree.cc"
    "C:/msys64/home/user/examples/pdf-npages.cc"
    "C:/msys64/home/user/examples/pdf-overlay-page.cc"
    "C:/msys64/home/user/examples/pdf-parse-content.cc"
    "C:/msys64/home/user/examples/pdf-set-form-values.cc"
    "C:/msys64/home/user/examples/pdf-split-pages.cc"
    "C:/msys64/home/user/examples/qpdf-job.cc"
    "C:/msys64/home/user/examples/qpdfjob-c-save-attachment.c"
    "C:/msys64/home/user/examples/qpdfjob-c.c"
    "C:/msys64/home/user/examples/qpdfjob-save-attachment.cc"
    )
endif()

