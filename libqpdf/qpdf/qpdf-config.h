/* options */
/* #undef AVOID_WINDOWS_HANDLE */
#define DEFAULT_CRYPTO "gnutls"
#define USE_CRYPTO_GNUTLS 1
/* #undef USE_CRYPTO_NATIVE */
#define USE_CRYPTO_OPENSSL 1
/* #undef USE_INSECURE_RANDOM */
/* #undef SKIP_OS_SECURE_RANDOM */

/* large file support -- may be needed for 32-bit systems */
#define _FILE_OFFSET_BITS 64

/* headers files */
#define HAVE_INTTYPES_H 1
#define HAVE_STDINT_H 1

/* OS functions and symbols */
#define HAVE_EXTERN_LONG_TIMEZONE 1
#define HAVE_FSEEKO 1
#define HAVE_FSEEKO64 1
/* #undef HAVE_LOCALTIME_R */
/* #undef HAVE_RANDOM */
/* #undef HAVE_TM_GMTOFF */
/* #undef HAVE_MALLOC_INFO */
/* #undef HAVE_OPEN_MEMSTREAM */

/* system random device (e.g. /dev/random) if any */
/* #undef RANDOM_DEVICE */

/* bytes in the size_t type */
#define SIZEOF_SIZE_T 8
