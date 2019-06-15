import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import { toJS } from "mobx";
import { Input } from "antd";
import "../styles/Home.css";
import Forecast from "./Forecast";
import WeatherDetails from "./WeatherDetails";
import { geolocated } from "react-geolocated";

const weatherStore = rootStores[WeatherStore];
const Search = Input.Search;
@observer
class Home extends Component {
  async componentDidMount() {
    try {
      await weatherStore.loadWeatherData();
      await weatherStore.loadWeatherForecast();
    } catch (err) {
      throw err;
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.isGeolocationEnabled) {
      if (
        this.props.coords &&
        this.props.coords.latitude &&
        this.props.coords.longitude
      ) {
        weatherStore.loadWeatherData(
          this.props.coords.latitude,
          this.props.coords.longitude
        );
        weatherStore.loadWeatherForecast(
          this.props.coords.latitude,
          this.props.coords.longitude
        );
      }
    }
  }

  searchBylocation = async location => {
    if (location) {
      try {
        await weatherStore.googlePlaceSearchApi(location);
      } catch (err) {
        throw err;
      } finally {
        weatherStore.loadWeatherData();
        weatherStore.loadWeatherForecast();
      }
    }
  };

  render() {
    const weather = weatherStore.weatherData;
    const weatherForecast = weatherStore.weatherForecast;
    // console.log("weather", toJS(weather));
    // console.log("weatherForecast", toJS(weatherForecast));
    if (weather) {
      return (
        <div className="home-main-container">
          <div className="home-input-search-text">
            <Search
              className="home-input-city-search-text"
              placeholder="Please enter a city or country name"
              onSearch={value => this.searchBylocation(value)}
              enterButton
            />
          </div>
          <div className="home-weather-details-forecast">
            <WeatherDetails weather={weather} />
            <Forecast weatherForecast={weatherForecast} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const MainWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Home);

export default MainWithGeoloc;
