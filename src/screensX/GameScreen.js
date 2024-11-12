import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

const GameScreen = ({ route }) => {

  const { gameId, userName } = route.params;

  
  const injectedJS = `
    (function() {
     
    const gameLevels = [1000, 3000, 5000, 1000, 15000]; // Set game levels

    window.userName = ${JSON.stringify(userName)};
    window.gameLevels = gameLevels;
    
    // console.log("Injected userName:", window.userName);
      window.onerror = function(msg, url, lineNo, columnNo, error) {
        const message = {
          msg: msg,
          url: url,
          lineNo: lineNo,
          columnNo: columnNo,
          error: error ? error.toString() : null
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
        return false;  // prevents default error handling.
      };
    })();
  `;

  

  // const handleWebViewMessage = (event) => {
  //   const errorData = JSON.parse(event.nativeEvent.data);
  //   console.log('Error inside WebView:', errorData);
  //   // Alert.alert('WebView Error', `Message: ${event.nativeEvent.data.msg}\nURL: ${event.nativeEvent.data.url}\nLine: ${event.nativeEvent.data.lineNo}\nColumn: ${event.nativeEvent.data.columnNo}`);
  // };

  // const injectedJS = `
  //   window.userName = "rahimnath_03822";
  //   console.log("Injected userName:", window.userName);
  //   true; // Required to signal completion
  // `;

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data; // Access the message data
    console.log("Message received from WebView:", message);
  };
  

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: `file:///android_asset/${gameId}/index.html` }}  // For Android
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        // injectedJavaScript={injectedJS}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
        onMessage={handleWebViewMessage}
        onError={(event) => console.error("WebView error:", event.nativeEvent)}
        onHttpError={(event) => console.warn("HTTP error:", event.nativeEvent)}
        onLoadEnd={() => console.log("WebView finished loading")}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GameScreen;
