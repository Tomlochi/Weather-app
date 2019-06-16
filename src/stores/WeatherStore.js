import { observable, action, computed } from "mobx";
import WeatherService from "../services/WeatherService";
import Weather from "../models/Weather";
import _isUndefined from "lodash/isUndefined";

export default class WeatherStore {
  @observable weatherData = new Weather();
  @observable weatherFavData = new Weather();
  @observable weatherForecast = new Weather();
  @observable favDb;
  @observable location = { lon: "34.78176759999999", lat: "32.0852999" };
  @observable showModal;
  @observable modalText;
  @observable errorValidation;
  @observable firstTime = true;
  @observable backImage = "https://source.unsplash.com/600x400/?Tel Aviv";

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
  loadBackgroundImage = async location => {
    const name = _isUndefined(location) ? "Tel Aviv" : location;
    try {
      this.backImage = await WeatherService.getWeatherBackgroundImage(name);
    } catch (e) {
      throw e;
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
      if (placeSearch && placeSearch.data.status !== "ZERO_RESULTS") {
        this.location.lat = placeSearch.data.results[0].geometry.location.lat;
        this.location.lon = placeSearch.data.results[0].geometry.location.lng;
      } else {
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
