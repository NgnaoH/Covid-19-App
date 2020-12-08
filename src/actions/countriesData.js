import { ADD_COUNTRY_DATA, SET_COUNTRIES_DATA, SET_SUMMARY } from "./types"

import ApiService from "../services/api.service"

export const addCountryData = (countrySlug, data) => {
  return {
    type: ADD_COUNTRY_DATA,
    country: countrySlug,
    data: data,
  }
}

import { takeRight, sum, forIn, map, groupBy } from "lodash"

export const fetchCountryData = (countrySlug) => {
  return function (dispatch) {
    return ApiService.getCountryData(countrySlug)
      .then((response) => {
        const responseData = response.data
        const data = responseData.map((day) => ({
          confirmed: day.Confirmed,
          recovered: day.Recovered,
          deaths: day.Deaths,
          active: day.Active,
          date: day.Date,
        }))
        const groupedByData = groupBy(data, (o) => o.date)
        const summedData = []
        forIn(groupedByData, (value, key) => {
          let data = {
            confirmed: sum(map(value, "confirmed")),
            recovered: sum(map(value, "recovered")),
            deaths: sum(map(value, "deaths")),
            active: sum(map(value, "active")),
            date: key,
          }
          summedData.push(data)
        })
        const takenRightData = takeRight(summedData, 5)
        dispatch(addCountryData(countrySlug, takenRightData))
      })
      .catch((err) => {})
  }
}

export const setCountriesData = (data) => {
  return {
    type: SET_COUNTRIES_DATA,
    data: data,
  }
}

export const setSummary = (data) => {
  return {
    type: SET_SUMMARY,
    data: data,
  }
}

export const fetchSummary = () => {
  return function (dispatch) {
    return ApiService.getSummary()
      .then((response) => {
        const data = response.data
        const mappedCountries = data.Countries.map((country) => ({
          name: country.Country,
          totalConfirmed: country.TotalConfirmed,
          totalDeaths: country.TotalDeaths,
          totalRecovered: country.TotalRecovered,
        }))
        dispatch(
          setSummary({
            global: data.Global,
            countries: mappedCountries,
          })
        )
      })
      .catch((err) => ({}))
  }
}
