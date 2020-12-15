import React, { useRef, useState, useEffect, useMemo } from "react"

import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  PanResponder,
  ScrollView,
} from "react-native"

import Animated from "react-native-reanimated"

import { PanGestureHandler } from "react-native-gesture-handler"

import { connect } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"

import * as d3 from "d3"

import WorldMapCard from "../components/WorldMapCard"

import WorldTop from "../components/WorldTop"

import { navigate } from "../RootNavigation"

import MapChart from "../components/MapChart"
import { useTheme } from "../themes"
import Header from "../components/Header"
import { fetchSummary, setSummary } from "../actions/countriesData"
import CallToActionButton from "../components/CallToActionButton"

const WorldMapScreen = (props) => {
  const [COUNTRIES, setCOUNTRIES] = useState(null)
  const [field, setField] = useState("totalConfirmed")
  const [fields, setFields] = useState([
    {
      field: "totalConfirmed",
      name: "Confirmed",
    },
    {
      field: "totalDeaths",
      name: "Deaths",
    },
    {
      field: "totalRecovered",
      name: "Recovered",
    },
  ])

  useEffect(() => {
    ;(async () => {
      const { COUNTRIES } = await import("../constants/countryShape")
      setCOUNTRIES(COUNTRIES)
    })()
    return
  }, [])

  useEffect(() => {
    ;(async () => {
      const json = await AsyncStorage.getItem("summary")
      if (!json) return
      const data = JSON.parse(json)
      props.setSummary(data)
    })()
  }, [])

  useEffect(() => {
    props.fetchSummary()
    return
  }, [])

  const maxCases = useMemo(() => {
    return d3.max(props.summary.countries.map((country) => country[field]))
  }, [field, props.summary])

  useEffect(() => {
    setFields(
      fields.map((field) => ({
        ...field,
        quantity: props.summary.global[field.field],
      }))
    )
  }, [props.summary])

  const colorizeFunctions = useMemo(() => {
    const colors = {
      totalConfirmed: d3
        .scaleSequentialSymlog(d3.interpolateOranges)
        .domain([0, maxCases]),
      totalDeaths: d3
        .scaleSequentialSymlog(d3.interpolateReds)
        .domain([0, maxCases]),
      totalRecovered: d3
        .scaleSequentialSymlog(d3.interpolateGreens)
        .domain([0, maxCases]),
    }

    return colors
  }, [maxCases])

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <Header
          title="World Map"
          subtitle="Monitoring cases all over the world"
        />
        <MapChart
          COUNTRIES={COUNTRIES}
          summary={props.summary}
          colorize={colorizeFunctions}
          maxCases={maxCases}
          field={field}
          dimensions={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        />
        <View style={styles.info}>
          <View style={styles.row}>
            {fields.map((fieldChild, index) => (
              <View
                key={`fieldMap${index}`}
                style={[{ width: "33.33%" }, styles.column]}
              >
                <WorldMapCard
                  field={fieldChild}
                  currentField={field}
                  onPress={() => setField(fieldChild.field)}
                ></WorldMapCard>
              </View>
            ))}
          </View>
        </View>
        <WorldTop currentField={field} summary={props.summary} />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            width: Dimensions.get("window").width,
            flexDirection: "row",
          }}
        >
          <CallToActionButton
            style={{
            marginBottom: 20
            }}
            onPress={() => navigate("YourCountry")}
            content={() => <Text>Back</Text>}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const theme = useTheme()

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    minHeight: Dimensions.get("window").height,
  },
  map: {
    width: Dimensions.get("window").width,
    backgroundColor: theme.secondary,
  },
  info: {
    backgroundColor: theme.background,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  column: {
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

const mapStateToProps = (state) => {
  return {
    summary: state.countriesData.summary,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSummary: () => dispatch(fetchSummary()),
    setSummary: (data) => dispatch(setSummary(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapScreen)
