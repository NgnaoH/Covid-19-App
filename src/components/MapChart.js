import React, { memo, useState, useRef, useEffect, useMemo } from "react"
import {
  Dimensions,
  StyleSheet,
  PanResponder,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native"

import { useTheme } from "../themes"

import Svg, { G, Path } from "react-native-svg"

import * as d3 from "d3"

import { PanGestureHandler, State } from "react-native-gesture-handler"
import AppIcon from "./AppIcon"

const theme = useTheme()

const MapChart = (props) => {
  const [countryList, setCountryList] = useState([])

  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [lastTranslateX, setLastTranslateX] = useState(0)
  const [lastTranslateY, setLastTranslateY] = useState(0)
  const [scale, setScale] = useState(1)

  const { dimensions } = props

  const mapExtent = useMemo(() => {
    return dimensions.width > dimensions.height / 2
      ? dimensions.height / 2
      : dimensions.width
  }, [dimensions])

  const countryPaths = useMemo(() => {
    if (!props.COUNTRIES || !props.summary.countries.length) return
    const projection = d3
      .geoMercator()
      .center([0, 0])
      .fitSize([mapExtent, mapExtent], {
        type: "FeatureCollection",
        features: props.COUNTRIES,
      })
      .translate([dimensions.width / 2, mapExtent / 2])

    const geoPath = d3.geoPath().projection(projection)

    const windowPaths = props.COUNTRIES.map(geoPath)

    return windowPaths
  }, [dimensions, props.COUNTRIES, props.summary])

  useEffect(() => {
    if (!props.COUNTRIES || !props.summary.countries.length) return

    setCountryList(
      countryPaths.map((path, i) => {
        let countryName = props.COUNTRIES[i].properties.name
        const data = props.summary.countries.find((country) => {
          let summaryCountryName
          switch (country.name) {
            case "Russian Federation":
              summaryCountryName = "Russia"
              break
            case "Iran, Islamic Republic of":
              summaryCountryName = "Iran"
              break
            case "Syrian Arab Republic (Syria)":
              summaryCountryName = "Syria"
              break
            case "Congo (Kinshasa)":
              summaryCountryName = "Dem. Rep. Congo"
              break
            case "Tanzania, United Republic of":
              summaryCountryName = "Tanzania"
              break
            case "Congo (Brazzaville)":
              summaryCountryName = "Congo"
              break
            case "South Sudan":
              summaryCountryName = "S. Sudan"
              break
            case "Central African Republic":
              summaryCountryName = "Central African Rep."
              break
            case "Venezuela (Bolivarian Republic)":
              summaryCountryName = "Venezuela"
              break
            case "Korea (South)":
              summaryCountryName = "South Korea"
              break
            case "Viet Nam":
              summaryCountryName = "Vietnam"
              break
            case "Lao PDR":
              summaryCountryName = "Laos"
              break
            case "Czech Republic":
              summaryCountryName = "Czechia"
              break
            default:
              summaryCountryName = country.name
          }
          if (country.name === "Somalia" && countryName === "Somaliland") {
            return true
          }

          return summaryCountryName === countryName
        })

        return (
          <Path
            key={`countryName${i}`}
            d={path}
            stroke={theme.text_primary}
            strokeWidth={0.25}
            fill={
              data
                ? props.colorize[props.field](data[props.field])
                : theme.text_secondary
            }
            style={{
              zIndex: 100,
            }}
          />
        )
      })
    )
  }, [props.COUNTRIES, props.summary, props.field])

  const panGestureHandler = (event) => {
    setTranslateX(-event.nativeEvent.translationX / scale + lastTranslateX)
    setTranslateY(-event.nativeEvent.translationY / scale + lastTranslateY)
  }

  const panStateHandler = (event) => {
    if (event.nativeEvent.oldState === State.UNDETERMINED) {
      setLastTranslateX(translateX)
      setLastTranslateY(translateY)
    }
  }

  const resetPosition = () => {
    setTranslateX(0)
    setTranslateY(0)
    setScale(1)
  }

  const zoomOut = () => {
    const newScale = scale - 0.5
    if (newScale < 1) return
    setScale(newScale)
  }
  const zoomIn = () => {
    const newScale = scale + 0.5
    if (newScale > 5) return
    setScale(newScale)
  }

  return (
    <View {...props} style={styles.container}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3000,
          display: countryList.length ? "none" : "flex",
        }}
      >
        <Text
          style={{
            color: theme.background,
            fontSize: 16,
            display: countryList.length ? "none" : "flex",
          }}
        >
          Loading...
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={() => zoomIn()}>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            zIndex: 4000,
            left: 100,
            backgroundColor: theme.background,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon name="plus" size={16} color={theme.primary_orange} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => zoomOut()}>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            zIndex: 4000,
            left: 60,
            backgroundColor: theme.background,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon name="minus" size={16} color={theme.primary_yellow} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => resetPosition()}>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            zIndex: 4000,
            left: 20,
            backgroundColor: theme.background,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon name="rotate-ccw" size={16} color={theme.secondary} />
        </View>
      </TouchableWithoutFeedback>

      <PanGestureHandler
        onGestureEvent={(e) => panGestureHandler(e)}
        onHandlerStateChange={(e) => panStateHandler(e)}
      >
        <Svg
          style={[styles.map]}
          width={dimensions.width}
          height={dimensions.height / 2}
        >
          {/* <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop
                  offset="0"
                  stopColor={theme.secondary_light}
                  stopOpacity="1"
                />
                <Stop offset="1" stopColor={theme.secondary} stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect
              fill="url(#grad)"
              width={dimensions.width}
              height={dimensions.height / 2}
            ></Rect> */}
          <G
            transform={`scale(${scale}) translate(${-translateX}, ${-translateY})`}
          >
            {countryList.map((x) => x)}
          </G>
        </Svg>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 20,
  },
  map: {
    backgroundColor: theme.text_primary,
    position: "relative",
  },
})

export default memo(MapChart)
