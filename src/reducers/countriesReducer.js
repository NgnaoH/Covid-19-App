import { SET_COUNTRIES, SET_CURRENT_COUNTRY } from "../actions/types"

export const initialState = {
  countries: [],
  currentCountry: {
    name: "",
    slug: "",
  },
}

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
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
