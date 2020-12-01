import React, { useRef, useState } from "react"
import {
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  View,
  Image,
} from "react-native"

import AppIcon from "../components/AppIcon"

import GetStartedFirstImage from "../assets/get_started_first.png"
import GetStartedSecondImage from "../assets/get_started_second.png"

import GetStartedFirstBlob from "../components/Blob"

import CallToActionButton from "../components/CallToActionButton"

import TransitionCircleOut from "../components/TransitionCircleOut"

import { navigate } from "../RootNavigation"

import { useTheme } from "../themes"

const theme = useTheme()

const GetStartedScreen = () => {
  const scrollViewRef = useRef(null)

  const transitionCircleOutRef = useRef(false)

  const [isTransiting, setIsTransiting] = useState()

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      style={styles.body}
    >
      <View style={styles.step}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={GetStartedFirstImage}
        />
        <GetStartedFirstBlob style={styles.blob} />
        <Text style={styles.title}>Let us make you safe</Text>
        <Text style={styles.subtitle}>
          We provide information about the ongoing COVID-19 pandemic.
        </Text>
        <CallToActionButton
          content={() => <AppIcon name="chevron-right" size={24} />}
          style={{ width: 80 }}
          onPress={() => {
            const index = 1
            scrollViewRef.current.scrollTo({
              x: Dimensions.get("window").width * index,
              y: 0,
              animated: true,
            })
          }}
        />
      </View>
      <View style={styles.step}>
        <View style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          backgroundColor: theme.background,
          position: "absolute",
          zIndex: isTransiting ? 5 : -1
        }}></View>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={GetStartedSecondImage}
        />
        <GetStartedFirstBlob style={styles.blob} />
        <Text style={styles.title}>Enjoy your time at peace</Text>
        <Text style={styles.subtitle}>
          Acknowledge everything happening may help you stay safe at home.
        </Text>
        <CallToActionButton
          content={() => <Text>GET STARTED</Text>}
          style={{ width: 140, zIndex: 5 }}
          onPress={() => {
            transitionCircleOutRef.current.transitionOut()
          }}
        />
        <TransitionCircleOut
          ref={transitionCircleOutRef}
          style={styles.circleTransition}
          callback={() => {
            setIsTransiting(true)
          }}
          callback2={() => {
            navigate("YourCountry")
            setIsTransiting(false)
          }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    position: "relative",
    backgroundColor: theme.background,
  },
  step: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleTransition: {
    position: "absolute",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: theme.text_primary,
  },
  subtitle: {
    fontSize: 16,
    width: Dimensions.get("window").width * 0.8,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
    color: theme.text_secondary,
  },
  blob: {
    position: "absolute",
    zIndex: -1,
  },
  image: {
    width: Dimensions.get("window").width - 60,
    height: 240,
  },
  first: {},
})

export default GetStartedScreen
