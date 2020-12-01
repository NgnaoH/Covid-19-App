import React, { useReducer, useState, useEffect } from "react"

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useTheme } from "../themes"

import { filter } from "lodash"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import {
  fetchCountries,
  setCurrentCountry,
  setCountries,
} from "../actions/countries"
import { addCountryData, fetchCountryData } from "../actions/countriesData"

const theme = useTheme()

import { connect } from "react-redux"

const YourCountrySearch = (props) => {
  const [searchText, setSearchText] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])

  const animatedResultSharedProp = useSharedValue(0)
  const animatedResultStyle = useAnimatedStyle(() => ({
    height: animatedResultSharedProp.value,
    maxHeight: animatedResultSharedProp.value,
  }))

  useEffect(() => {
    props.fetchCountries()
    return
  }, [])

  useEffect(() => {
    if (!searchText) {
      setFilteredCountries([])
      return
    }

    const regex = new RegExp(searchText, "gi")
    const filteredCountries = filter(props.countries, (country) =>
      country.name.toLowerCase().match(regex)
    )
    setFilteredCountries(filteredCountries)

    return
  }, [searchText])

  return (
    <View style={styles.search}>
      <TextInput
        style={styles.input}
        placeholder="Search for a country..."
        clearButtonMode="always"
        onChangeText={(text) => {
          if (text) {
            animatedResultSharedProp.value = withTiming(
              Dimensions.get("window").height * 0.5,
              {
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
              }
            )
          } else {
            animatedResultSharedProp.value = withTiming(0, {
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true
            })
          }
          setSearchText(text)
        }}
        onFocus={() => setSearchText("")}
        onBlur={() => {
          animatedResultSharedProp.value = withTiming(0, {
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true
          })
        }}
        value={searchText}
      ></TextInput>
      <Animated.View style={[styles.result, animatedResultStyle]}>
        <ScrollView nestedScrollEnabled style={{ flexGrow: 0 }}>
          {filteredCountries.map((country, index) => (
            <View style={styles.country} key={index}>
              <TouchableWithoutFeedback
                onPress={async () => {
                  props.setCurrentCountry({
                    name: country.name,
                    slug: country.slug,
                  })
                  setSearchText(country.name)
                  if(props.countriesData[country.slug]) return
                  props.fetchCountryData(country.slug)
                }}
              >
                <Text style={styles.countryName}>
                  {country.name} ({country.iso2})
                </Text>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: 20,
    zIndex: 10,
    marginTop: -20,
  },
  result: {
    width: Dimensions.get("window").width - 40,
    flex: 1,
    marginTop: 0,
  },
  input: {
    borderTopColor: "#f09a48",
    borderLeftColor: "#ef8460",
    borderRightColor: "#f2bd42",
    borderBottomColor: theme.primary_yellow,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 999,
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 2.5,
    color: theme.text_secondary,
    backgroundColor: theme.background,
  },
  country: {
    backgroundColor: theme.background,
    borderBottomColor: theme.text_secondary,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  countryName: {
    color: theme.text_primary,
  },
})

const mapStateToProps = (state) => {
  return {
    countries: state.countries.countries,
    countriesData: state.countriesData.countriesData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    setCurrentCountry: (currentCountry) =>
      dispatch(setCurrentCountry(currentCountry)),
    fetchCountryData: (countrySlug) => dispatch(fetchCountryData(countrySlug)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourCountrySearch)
