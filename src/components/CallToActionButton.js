import React from "react"

import { TouchableWithoutFeedback, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated"

const CallToActionButton = ({
  onPress,
  style,
  content = () => <></>,
  ...restProps
}) => {
  const animate = useSharedValue(1)

  const animateStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: animate.value,
        },
        { scaleY: animate.value },
      ],
    }
  })

  return (
    <TouchableWithoutFeedback
      {...restProps}
      onPress={() => {
        animate.value = withTiming(
          0.9,
          {
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true
          },
          (finished) => {
            if (finished) {
              animate.value = withTiming(
                1,
                {
                  duration: 150,
                  easing: Easing.linear,
                  useNativeDriver: true
                },
                (finished) => {
                  finished && onPress()
                }
              )
            }
          }
        )
      }}
    >
      <Animated.View style={[animateStyles]}>
        <LinearGradient
          style={[
            {
              height: 40,
              width: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 999,
              ...style,
            },
          ]}
          colors={["#F2BA2D", "#EA5C3B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={{ color: "#fff" }}>{content()}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CallToActionButton
