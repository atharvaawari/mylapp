import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {GameContext} from '../context/Context';
import WebView from 'react-native-webview';

const PlayGame = () => {
  const {state} = useContext(GameContext);
  const {currentGame} = state;

  // window.userName = ${JSON.stringify(userName)};

  const injectedJS = `
    (function() {
     
    const gameLevels = [1000, 3000, 5000, 1000, 15000]; // Set game levels

    
    window.gameLevels = gameLevels;
    
    
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

  const handleWebViewMessage = event => {
    const message = event.nativeEvent.data; // Access the message data
    console.log('Message received from WebView:', message);
  };

  return (
    <View style={styles.container}>
      {currentGame.slug && (
        <WebView
          originWhitelist={['*']}
          source={{uri: `file:///android_asset/${currentGame.slug}/index.html`}} // For Android
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          // injectedJavaScript={injectedJS}
          injectedJavaScriptBeforeContentLoaded={injectedJS}
          onMessage={handleWebViewMessage}
          onError={event => console.error('WebView error:', event.nativeEvent)}
          onHttpError={event => console.warn('HTTP error:', event.nativeEvent)}
          onLoadEnd={() => console.log('WebView finished loading')}
        />
      )}
    </View>
  );
};

export default PlayGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
