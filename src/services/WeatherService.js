import axios from "axios";
import FavoriteLocation from "../models/FavoriteLocation";
import _assign from "lodash/assign";
import _forIn from "lodash/forIn";
import _uniqBy from "lodash/uniqBy";

class WeatherService {
  getWeatherData = async (lat, lon) => {
    if (lat && lon) {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ce29d6123a0d66008cf12b0c502470a
      `;
      try {
        const weather = await axios.get(url);
        if (weather) {
          return weather;
        }
      } catch (err) {
        throw err;
      }
    }
  };

  getWeatherForecast = async (lat, lon) => {
    const list = [];
    var index = 0;
    if (lat && lon) {
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7ce29d6123a0d66008cf12b0c502470a
      `;
      try {
        const weatherForecast = await axios.get(url);
        if (weatherForecast && weatherForecast.status) {
          if (weatherForecast.data.list) {
            //TODO traslate to lodash filter
            for (let i = 0; i < weatherForecast.data.list.length; i++) {
              if (i % 8 === 0) {
                list[index] = weatherForecast.data.list[i];
                index++;
              }
            }
          }
          weatherForecast.data.list = list;
          return weatherForecast;
        }
      } catch (err) {
        throw err;
      }
    }
  };

  saveLocationinTOFavoritesDb = location => {
    localStorage.setItem(location.id, JSON.stringify(location));
  };

  removeLocationFromFavoritesDb = location => {
    localStorage.removeItem(location.id, JSON.stringify(location));
  };

  getAllFavoritesFromDb = () => {
    let favDB = [],
      keys = Object.keys(localStorage),
      localFavIndex = keys.length;
    while (localFavIndex--) {
      favDB.push(JSON.parse(localStorage.getItem(keys[localFavIndex])));
    }

    return favDB;
  };

  googlePlaceSearch = async location => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCi2TROVzSRMeWXkWo0eg7srB849XLHvZo`;
    try {
      const placeSearch = await axios.get(url);
      if (placeSearch) {
        return placeSearch;
      }
    } catch (err) {
      throw err;
    }
  };
}

export default new WeatherService();
