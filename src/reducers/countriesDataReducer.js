import {
  ADD_COUNTRY_DATA,
  SET_COUNTRIES_DATA,
  SET_SUMMARY,
} from "../actions/types"

export const initialState = {
  countriesData: {},
  summary: {
    global: {},
    countries: [],
  },
}

import AsyncStorage from "@react-native-async-storage/async-storage"

const updateLocalStorage = async (data) => {
  try {
    const stringifiedData = JSON.stringify(data)
    await AsyncStorage.setItem("countriesData", stringifiedData)
  } catch (error) {}
}

const updateSummaryInLocalStorage = async (data) => {
  try {
    const stringifiedData = JSON.stringify(data)
    await AsyncStorage.setItem("summary", stringifiedData)
  } catch (error) {}
}

const countriesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY_DATA:
      const data = {
        ...state,
        countriesData: {
          ...state.countriesData,
          [action.country]: action.data,
        },
      }
      updateLocalStorage(data.countriesData)
      return data
    case SET_COUNTRIES_DATA:
      return {
        ...state,
        countriesData: action.data,
      }
    case SET_SUMMARY:
      updateSummaryInLocalStorage(action.data)
      return {
        ...state,
        summary: action.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default countriesDataReducer
