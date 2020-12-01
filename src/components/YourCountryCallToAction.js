import React from "react"

import { View, StyleSheet, Text, Dimensions } from "react-native"
import { navigate } from "../RootNavigation"
import { useTheme } from "../themes"
import CallToActionButton from "./CallToActionButton"

const YourCountryCallToAction = () => {
  return (
    <View style={styles.body}>
      <CallToActionButton
        style={{
          width: 150,
          height: 36,
        }}
        content={() => <Text>VIEW WORLD</Text>}
        onPress={() => {
          navigate("WorldMap")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width,
  },
})

export default YourCountryCallToAction
