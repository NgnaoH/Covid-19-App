import { SET_COUNTRIES, SET_CURRENT_COUNTRY } from "./types"

import { sortBy } from "lodash"

import ApiService from "../services/api.service"

export const setCountries = (countries) => ({
  type: SET_COUNTRIES,
  data: countries,
})

export const fetchCountries = () => {
  return function (dispatch) {
    ApiService.getCountries()
      .then((response) => {
        const countries = response.data.map((country) => ({
          name: country.Country,
          slug: country.Slug,
          iso2: country.ISO2,
        }))

        const sortedCountries = sortBy(countries, "name")

        dispatch(setCountries(sortedCountries))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const setCurrentCountry = (country) => {
  return {
    type: SET_CURRENT_COUNTRY,
    data: country,
  }
}
