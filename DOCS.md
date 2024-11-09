#ERROR-bunddling_or_metro-not-connecting-to-app
step-1: add assets folder inside android/app/src/main
step-2: command- 'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res'

APk Build Process:-
1. cd android
2. ./gradlew clean
3. ./gradlew assembleRelease


for new SHA1 create new debug.keystore file :
if keytool command is not exist error check for system and user, variables path:
system path: C:\Program Files\Microsoft\jdk-17.0.12.7-hotspot\bin
user path: C:\Users\MYL\AppData\Local\Android\Sdk\tools\bin
step1: delete existing file
step2: cd android
step3: cd app
step4: keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

get sha key command: 
keytool -list -v -keystore ./android/App/debug.keystore -alias androiddebugkey -storepass android -keypass android



Developer Error in google authentication:-

step1: