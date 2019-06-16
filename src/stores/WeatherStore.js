import { observable, action, computed } from "mobx";
import WeatherService from "../services/WeatherService";
import Weather from "../models/Weather";
import _isUndefined from "lodash/isUndefined";
const config = require("../configuration.json");

export default class WeatherStore {
  @observable weatherData = new Weather();
  @observable weatherFavData = new Weather();
  @observable weatherForecast = new Weather();
  @observable favDb;
  @observable location = { lon: config.defualtLon, lat: config.defualtLat };
  @observable showModal;
  @observable modalText;
  @observable errorValidation;
  @observable firstTime = true;
  @observable backImage = config.defultImage;

  @action
  loadWeather = async () => {
    try {
      await this.loadWeatherData();
      await this.loadWeatherForecast();
      return true;
    } catch (err) {
      console.error(err); //console.log or console.error
    }
  };

  @action
  loadWeatherData = async (lat, lon) => {
    lat = lat ? lat : this.location.lat;
    lon = lon ? lon : this.location.lon;
    return WeatherService.getWeatherData(lat, lon)
      .then(weatherData => {
        if (weatherData && weatherData.status) {
          this.weatherData = weatherData.data;
        } else {
          this.showModal = true;
        }
      })
      .catch(err => {
        throw err;
      });
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
  loadBackgroundImage = async location => {
    const name = _isUndefined(location) ? config.defualtCity : location;
    try {
      this.backImage = await WeatherService.getWeatherBackgroundImage(name);
    } catch (e) {
      throw e;
    }
  };

  @action
  getAllFavorites = () => {
    this.favDb = WeatherService.getAllFavoritesFromDb();
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
      if (placeSearch && placeSearch.data.status !== config.googleapisError) {
        this.location.lat = placeSearch.data.results[0].geometry.location.lat;
        this.location.lon = placeSearch.data.results[0].geometry.location.lng;
      } else {
        this.modalText = config.errorMessage;
        this.showModal = true;
      }
    });
  };

  @computed
  get getWeatherForecast() {
    if (this.weaterForecast) {
      return this.weaterForecast;
    } else return null;
  }
}
