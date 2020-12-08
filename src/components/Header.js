import React from "react"

import { View, StyleSheet, Text, Dimensions } from "react-native"

import { useTheme } from "../themes"

import Constants from "expo-constants"

import HeaderWave1 from "./HeaderWave1"
import HeaderWave2 from "./HeaderWave2"
import { LinearGradient } from "expo-linear-gradient"

const theme = useTheme()

const Header = (props) => {
  return (
    <View style={styles.header}>
      <LinearGradient
        style={[
          {
            height: "100%",
            width: "100%",
            zIndex: 0,
          },
        ]}
        colors={["#EA5C3B", "#F2BA2D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <HeaderWave1
        viewBox={`160 -100 ${Dimensions.get("window").width} 360`}
        style={styles.wave1}
      />
      <HeaderWave2
        viewBox={`160 -100 ${Dimensions.get("window").width} 360`}
        style={styles.wave1}
      />
      <View style={styles.headerContent}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 130,
    backgroundColor: theme.secondary,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
    width: Dimensions.get("window").width,
    position: "relative",
    overflow: "hidden",
  },
  headerContent: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 20,
    position: "absolute",
    zIndex: 5,
    width: "100%",
  },
  wave1: {
    position: "absolute",
  },
  title: {
    color: theme.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.background,
    fontSize: 14,
  },
})

export default Header
