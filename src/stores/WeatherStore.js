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
  loadWeatherData = async (cityName, countryName) => {
    return WeatherService.getWeatherData(cityName, countryName)
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
  addAreaToFavorite = area => {
    //WeatherService.
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
