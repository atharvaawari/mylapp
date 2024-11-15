# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep class com.google.** { *; }
-keep class io.grpc.** { *; }

# Keep React Native classes
-keep class com.facebook.react.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.fbreact.specs.** { *; }

# Keep OkHttp classes (used by React Native networking)
-dontwarn okhttp3.**
-keep class okhttp3.** { *; }

# Keep JS modules
-keep class com.facebook.react.modules.** { *; }

# Keep parts of the AndroidX libraries if they’re being used
-keep class androidx.** { *; }
-dontwarn androidx.**
-keep class com.demo.BuildConfig { *; }