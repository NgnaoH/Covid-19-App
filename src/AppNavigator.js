import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import GetStartedScreen from "./screens/GetStartedScreen"
import YourCountryScreen from "./screens/YourCountryScreen"
import WorldMapScreen from "./screens/WorldMapScreen"

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
      headerMode={false}
      initialRouteName="GetStarted"
    >
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="YourCountry" component={YourCountryScreen} />
      <Stack.Screen name="WorldMap" component={WorldMapScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator
