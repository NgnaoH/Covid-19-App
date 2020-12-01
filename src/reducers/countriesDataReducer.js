import { ADD_COUNTRY_DATA } from "../actions/types"

export const initialState = {
  countriesData: {},
}

const countriesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRY_DATA:
      return {
        ...state,
        countriesData: {
          ...state.countriesData,
          [action.country]: action.data,
        },
      }
    default:
      return {
        ...state,
      }
  }
}

export default countriesDataReducer
