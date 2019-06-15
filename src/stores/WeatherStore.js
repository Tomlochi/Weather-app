import { observable, action, computed, toJS } from "mobx";
import WeatherService from "../services/WeatherService";
import Weather from "../models/Weather";
import _concat from "lodash/concat";
import isUndefined from "lodash/isUndefined";

export default class WeatherStore {
  constructor() {
    // this.loadWeatherData(this.location.lat, this.location.lon);
  }
  @observable weatherData = new Weather();
  @observable weatherFavData = new Weather();
  @observable weatherForecast = new Weather();
  @observable favDb;
  @observable location = { lon: "34.78176759999999", lat: "32.0852999" };

  @action
  loadWeatherData = async (lat, lon) => {
    lat = lat ? lat : this.location.lat;
    lon = lon ? lon : this.location.lon;
    return WeatherService.getWeatherData(lat, lon)
      .then(weatherData => {
        if (weatherData && weatherData.status) {
          this.weatherData = weatherData.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  @action
  getAllFavorites = () => {
    this.favDb = WeatherService.getAllFavoritesFromDb();
  };

  @action
  loadWeatherForecast = async (lat, lon) => {
    lat = lat ? lat : this.location.lat;
    lon = lon ? lon : this.location.lon;
    try {
      const weatherForecast = await WeatherService.getWeatherForecast(lat, lon);
      this.weatherForecast = weatherForecast.data;
    } catch (err) {
      throw err;
    }
  };

  @action
  addLocationToFavorite = location => {
    WeatherService.saveLocationinTOFavoritesDb(location);
  };

  @action
  removeLocationFromFavorite = location => {
    WeatherService.removeLocationFromFavoritesDb(location);
  };

  @action
  googlePlaceSearchApi = async location => {
    return WeatherService.googlePlaceSearch(location).then(placeSearch => {
      if (placeSearch && placeSearch.status) {
        this.location.lat = placeSearch.data.results[0].geometry.location.lat;
        this.location.lon = placeSearch.data.results[0].geometry.location.lng;
      }
    });
  };

  @action
  setCityName = cityName => {
    this.cityName = cityName;
  };
  @action
  setCountryName = countryName => {
    this.countryName = countryName;
  };
  @computed
  get getWeatherForecast() {
    if (this.weaterForecast) {
      return this.weaterForecast;
    } else return null;
  }
}
