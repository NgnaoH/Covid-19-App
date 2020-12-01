import React, { useState, useEffect } from "react"

import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native"

import { useTheme } from "../themes"

import Header from "../components/Header"
import YourCountrySearch from "../components/YourCountrySearch"

import YourCountryCallToAction from "../components/YourCountryCallToAction"
import YourCountryChart from "../components/YourCountryChart"
import YourCountryCard from "../components/YourCountryCard"

import ViewWorldImage from "../assets/view_world.png"

import Blob from "../components/Blob"
import { connect } from "react-redux"

const theme = useTheme()

const YourCountryScreen = (props) => {
  const [currentField, setCurrentField] = useState("confirmed")

  const [fields, setFields] = useState([
    {
      name: "Confirmed",
      field: "confirmed",
      quantity: "--",
    },
    {
      name: "Active",
      field: "active",
      quantity: "--",
    },
    {
      name: "Recovered",
      field: "recovered",
      quantity: "--",
    },
    {
      name: "Deaths",
      field: "deaths",
      quantity: "--",
    },
  ])

  useEffect(() => {
    const data = props.countriesData[props.currentCountry.slug]

    if (!data || !data.length)
      return setFields([
        {
          name: "Confirmed",
          field: "confirmed",
          quantity: "--",
        },
        {
          name: "Active",
          field: "active",
          quantity: "--",
        },
        {
          name: "Recovered",
          field: "recovered",
          quantity: "--",
        },
        {
          name: "Deaths",
          field: "deaths",
          quantity: "--",
        },
      ])

    const lastData = data[data.length - 1]

    setFields([
      {
        name: "Confirmed",
        field: "confirmed",
        quantity: lastData.confirmed,
      },
      {
        name: "Active",
        field: "active",
        quantity: lastData.active,
      },
      {
        name: "Recovered",
        field: "recovered",
        quantity: lastData.recovered,
      },
      {
        name: "Deaths",
        field: "deaths",
        quantity: lastData.deaths,
      },
    ])

    return
  }, [props.countriesData, props.currentCountry])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} nestedScrollEnabled>
        <Header subtitle={props.currentCountry.name} />
        <YourCountrySearch />
        <YourCountryChart field={currentField} />
        <View style={styles.info}>
          <View style={styles.row}>
            {fields.map((field, index) => (
              <View
                key={`field${index}`}
                style={[{ width: "50%" }, styles.column]}
              >
                <YourCountryCard
                  field={field}
                  currentField={currentField}
                  onPress={() => setCurrentField(field.field)}
                ></YourCountryCard>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            width: Dimensions.get("window").width,
            alignItems: "center",
            height: 240,
          }}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={ViewWorldImage}
          />
          <Blob style={styles.blob} />
        </View>
        <View style={styles.worldButton}>
          <YourCountryCallToAction
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    height: Dimensions.get("window").height,
  },
  worldButton: {
    paddingBottom: 20,
  },
  image: {
    width: Dimensions.get("window").width - 60,
    height: 240,
  },
  blob: {
    position: "absolute",
    zIndex: -1,
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
    currentCountry: state.countries.currentCountry,
    countriesData: state.countriesData.countriesData,
  }
}

export default connect(mapStateToProps)(YourCountryScreen)
