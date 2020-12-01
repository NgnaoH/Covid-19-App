import React, { forwardRef, useImperativeHandle } from "react"

import Svg, { Circle } from "react-native-svg"
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated"
import { Dimensions, StyleSheet } from "react-native"
import { useTheme } from "../themes"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const TransitionCircleOut = forwardRef((props, ref) => {
  const theme = useTheme()

  const radiusSharedValue = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: radiusSharedValue.value ? 0 : 1000,
    }
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      r: radiusSharedValue.value,
    }
  })

  useImperativeHandle(ref, () => ({
    transitionOut() {
      radiusSharedValue.value = withTiming(
        1000,
        {
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true
        },
        (finished) => {
          if (finished) {
            props.callback && props.callback()
            radiusSharedValue.value = withTiming(
              0,
              {
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: true
              },
              (finished) => {
                if (finished) {
                  props.callback2 && props.callback2()
                }
              }
            )
          }
        }
      )
    },
  }))

  return (
    <AnimatedSvg {...props} style={[styles.svg, animatedStyles]}>
      <AnimatedCircle
        fill={theme.primary_orange}
        cx="50%"
        cy="50%"
        animatedProps={animatedProps}
      />
    </AnimatedSvg>
  )
})

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
    zIndex: 10,
    top: 0,
  },
})

export default TransitionCircleOut
