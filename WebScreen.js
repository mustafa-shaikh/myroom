import React from 'react';
import {
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';


const WebScreen = ({route}) => {

  return (
      
      <View style={{ backgroundColor: 'blue',flex: 1}}>
          
      <WebView
        source={{ uri: `https://www.google.com/search?q=${route.params.paramKey}` }}
        style={{ marginTop: 20, }}
        
        
      />
    </View>

  );
};

export default WebScreen;
