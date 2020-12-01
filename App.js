import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import React from "react"

import { NavigationContainer } from "@react-navigation/native"

import AppNavigator from "./src/AppNavigator"
import { View } from "react-native"

import { navigationRef } from "./src/RootNavigation"

import { Provider } from "react-redux"

import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  )
}
