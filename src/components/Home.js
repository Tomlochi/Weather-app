import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import { toJS } from "mobx";
import { Input } from "antd";
import "../styles/Home.css";

const weatherStore = rootStores[WeatherStore];
const Search = Input.Search;

@observer
class Home extends Component {
  componentDidMount() {
    weatherStore.loadWeatherData();
    weatherStore.loadWeatherForecast();
    weatherStore.googlePlaceSearchApi();
  }

  searchByCity = cityName => {
    console.log(cityName);
    if (cityName) {
      weatherStore.setCityName(cityName);
      weatherStore.loadWeatherData(cityName);
    }
  };

  searchByCountry = CountryName => {
    console.log(CountryName);
    if (CountryName) {
      weatherStore.setCountryName(CountryName);
      weatherStore.loadWeatherData(CountryName);
    }
  };

  render() {
    const weather = weatherStore.weatherData;
    const weatherForecast = weatherStore.weaterForecast;
    console.log("the weater is ", toJS(weather));
    console.log("the weaterForecast is ", toJS(weatherForecast));
    return (
      <div className="home-main-container">
        <div className="home-input-search-text">
          <Search
            className="home-input-city-search-text"
            placeholder="Please enter a city name"
            onSearch={value => this.searchByCity(value)}
            enterButton
          />
          <Search
            className="home-input-country-search-text"
            placeholder="Please enter a country name"
            onSearch={value => this.searchByCountry(value)}
            enterButton
          />
        </div>
      </div>
    );
  }
}

export default Home;
