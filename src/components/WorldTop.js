import React, { useEffect, useState } from "react"

import { View, Text, FlatList, StyleSheet } from "react-native"
import { useTheme } from "../themes"

const { take, sortBy } = require("lodash")

function WorldTop(props) {
  const [data, setData] = useState([])
  const [currentCountryData, setCurrentCountryData] = useState({})

  useEffect(() => {
    const sortedData = sortBy(
      props.summary.countries,
      props.currentField
    ).reverse()
    const takenData = take(sortedData, 5).map((country, index) => ({
      ...country,
      nth: index + 1,
    }))
    const existCountryInTop5 = takenData.some(
      (country) => country.name === currentCountryData
    )

    if (!existCountryInTop5) {
      let index = sortedData.findIndex(
        (country) => country.name === currentCountryData
      )
      if(index < 0) return
      return setData([...takenData, { ...sortedData[index], nth: index + 1 }])
    }
    setData(takenData)
  }, [props.summary, props.currentField, props.currentCountry])

  useEffect(() => {
    setCurrentCountryData(props.currentCountry.name)
  }, [props.currentCountry])

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Top country:
        </Text>
      </View>
      {data.map((country) => (
        <View style={styles.row} key={country.name}>
          <View style={styles.column}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  paddingRight: 15,
                  fontWeight:
                    currentCountryData === country.name ? "bold" : "normal",
                }}
              >
                {country.nth}
              </Text>
              <Text
                style={{
                  fontWeight:
                    currentCountryData === country.name ? "bold" : "normal",
                }}
              >
                {country.name}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            <Text
              style={{
                fontWeight:
                  currentCountryData === country.name ? "bold" : "normal",
              }}
            >
              {country[props.currentField]}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const theme = useTheme()

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  column: {
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottomColor: theme.text_secondary,
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
  },
})

/*
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
          */

import { connect } from "react-redux"

const mapStateToProps = (state) => {
  return {
    currentCountry: state.countries.currentCountry,
  }
}

export default connect(mapStateToProps)(WorldTop)
