import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import mainScreen from './MainScreen.js';
import proceedingScreen from './ProceedingScreen.js';
import webScreen from './WebScreen.js'

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mainScreen">
        <Stack.Screen name="IPT_Project" component={mainScreen} 
         />
         <Stack.Screen name="Search" component={proceedingScreen} 
         />
         <Stack.Screen name="Web" component={webScreen} 
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;