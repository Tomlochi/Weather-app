import { observable, action, computed } from "mobx";
import WeatherService from "../services/WeatherService";
import Weather from "../models/Weather";

export default class WeatherStore {
  constructor() {
    this.loadWeatherData(this.cityName, this.countryName);
  }
  @observable weatherData = new Weather();
  @observable weaterForecast = new Weather();
  @observable cityName = "Tel Aviv District";
  @observable countryName = "IL";

  @action
  loadWeatherData = async (lat, lon) => {
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
  loadWeatherData2 = async (cityName, countryName) => {
    return WeatherService.getWeatherData2(cityName, countryName)
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
  loadWeatherForecast = async (cityName, countryName) => {
    return WeatherService.getWeatherForecast(cityName, countryName)
      .then(weaterForecast => {
        if (weaterForecast && weaterForecast.status) {
          this.weaterForecast = weaterForecast.data;
        }
      })
      .catch(err => {
        throw err;
      });
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
  googlePlaceSearchApi = async () => {
    return WeatherService.googlePlaceSearch().then(placeSearch => {
      console.log("placeSearch ", placeSearch);
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
