import { observable, action } from "mobx";
import WeatherService from "../services/WeatherService";
import Weather from "../models/Weather";
import { async } from "q";

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
    cityName = "Tel Aviv District";
    countryName = "IL";
    return WeatherService.getWeatherForecast(cityName, countryName)
      .then(weaterForecast => {
        if (weaterForecast && weaterForecast.status) {
          console.log("i am here");
          this.weaterForecast = weaterForecast.data;
        }
      })
      .catch(err => {
        throw err;
      });
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
}
