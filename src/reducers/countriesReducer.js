import { SET_COUNTRIES, SET_CURRENT_COUNTRY } from "../actions/types"

export const initialState = {
  countries: [],
  currentCountry: {
    name: "",
    slug: "",
  },
}

import AsyncStorage from "@react-native-async-storage/async-storage"

const updateLocalStorage = async (data) => {
  try {
    const stringifiedData = JSON.stringify(data)
    await AsyncStorage.setItem("countries", stringifiedData)
  } catch (error) {}
}

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      updateLocalStorage(action.data)

      return {
        ...state,
        countries: action.data,
      }
    case SET_CURRENT_COUNTRY:
      return {
        ...state,
        currentCountry: action.data,
      }
    default:
      return {
        ...state,
      }
  }
}

export default countriesReducer
