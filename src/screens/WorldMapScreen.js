import React, { useRef } from "react"

import WorldMap from "../components/WorldMap"

import { StyleSheet, View, Dimensions, PanResponder } from "react-native"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"

const WorldMapScreen = () => {
  const panX = useSharedValue(0)
  const panY = useSharedValue(0)
  let panInitX = 0
  let panInitY = 0

  const animatedPanStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: panX.value,
      },
      {
        translateY: panY.value,
      },
    ],
  }))

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        panInitX = gestureState.x0
        panInitY = gestureState.y0
      },
      onPanResponderMove: (event, gestureState) => {
        panX.value = panInitX - gestureState.x0
        panY.value = panInitY - gestureState.y0
      },
      onPanResponderRelease: () => {},
    })
  ).current

  return (
    <View style={styles.container}>
      <Animated.View
        style={[{}, animatedPanStyle]}
        {...panResponder.panHandlers}
      >
        <WorldMap />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  map: {},
})

export default WorldMapScreen
