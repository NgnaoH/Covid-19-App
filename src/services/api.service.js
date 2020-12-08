import axios from "axios"

import moment from "moment"

const baseURL = "https://api.covid19api.com"

const ApiService = {
  getCountries: () => {
    return axios.get(`${baseURL}/countries`)
  },
  getCountryData: (countrySlug) => {
    const todayUTC = moment.utc(moment().startOf("day"))
    const fiveDayAgoUTC = moment.utc(moment().subtract(8, "d").startOf("day"))
    return axios.get(`${baseURL}/country/${countrySlug}`, {
      params: {
        from: "" + fiveDayAgoUTC,
        to: "" + todayUTC,
      },
    })
  },
  getSummary: () => {
    return axios.get(`${baseURL}/summary`)
  },
}

export default ApiService
