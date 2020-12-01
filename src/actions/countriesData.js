import { ADD_COUNTRY_DATA } from "./types"

import ApiService from "../services/api.service"

export const addCountryData = (countrySlug, data) => {
  return {
    type: ADD_COUNTRY_DATA,
    country: countrySlug,
    data: data,
  }
}

import { takeRight, sum, forIn, map, groupBy } from "lodash"

import { Alert } from "react-native"

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
