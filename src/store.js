import { createStore, combineReducers, applyMiddleware } from "redux"

import thunkMiddleware from "redux-thunk"

import countriesReducer from "./reducers/countriesReducer"
import countriesDataReducer from "./reducers/countriesDataReducer"

const rootReducer = combineReducers({
  countries: countriesReducer,
  countriesData: countriesDataReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
