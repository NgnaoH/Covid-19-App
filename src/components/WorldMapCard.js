import { LinearGradient } from "expo-linear-gradient"
import React from "react"

import { TouchableWithoutFeedback, Text, View, StyleSheet } from "react-native"
import { useTheme } from "../themes"

const theme = useTheme()

const WorldMapCard = (props) => {
  return (
    <TouchableWithoutFeedback {...props} style={[styles.card]}>
      <View
        style={{
          height: 60,
          borderRadius: 10,
          backgroundColor:
            props.currentField === props.field.field
              ? theme.secondary
              : theme.secondary_background,
        }}
      >
        <LinearGradient
          colors={[theme.secondary, theme.secondary_light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: 60,
            borderRadius: 10,
            display: props.currentField === props.field.field ? "flex" : "none",
          }}
        />
        <Text
          style={[
            styles.title,
            {
              color:
                props.currentField === props.field.field
                  ? theme.background
                  : theme.secondary,
            },
          ]}
        >
          {props.field.name}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color:
                props.currentField === props.field.field
                  ? theme.background
                  : theme.secondary,
            },
          ]}
        >
          {props.field.quantity}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    height: 60,
    backgroundColor: theme.secondary,
  },
  title: {
    color: theme.background,
    fontSize: 12,
    position: "absolute",
    top: 10,
    left: 20,
  },
  subtitle: {
    color: theme.background,
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    top: 26,
    left: 20,
  },
})

export default WorldMapCard
