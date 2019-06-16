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
import ErrorModal from "./ErrorModal";

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

  componentDidUpdate(nextProps, prevProps) {
    console.log("nextProps", nextProps);
    console.log("prevProps", prevProps);
    if (nextProps.isGeolocationEnabled && weatherStore.firstTime) {
      if (
        this.props.coords &&
        this.props.coords.latitude &&
        this.props.coords.longitude
      ) {
        weatherStore.location.lon = this.props.coords.longitude;
        weatherStore.location.lat = this.props.coords.latitude;
        weatherStore.loadWeatherData();
        weatherStore.loadWeatherForecast();
      }
      weatherStore.firstTime = false;
    }
  }

  searchBylocation = async location => {
    if (location && !weatherStore.errorValidation) {
      try {
        await weatherStore.googlePlaceSearchApi(location);
      } catch (err) {
        throw err;
      } finally {
        weatherStore.loadWeatherData();
        weatherStore.loadWeatherForecast();
      }
    } else {
      weatherStore.showModal = true;
    }
  };

  searchValidation = e => {
    if (/[^a-zA-Z\s]/.test(e.target.value)) {
      weatherStore.errorValidation = true;
    } else {
      weatherStore.errorValidation = false;
    }
  };
  render() {
    const weather = weatherStore.weatherData;
    const weatherForecast = weatherStore.weatherForecast;
    const error = weatherStore.errorValidation ? "error" : "";
    // console.log("weather", toJS(weather));
    // console.log("weatherForecast", toJS(weatherForecast));
    if (weather) {
      return (
        <div className="home-main-container">
          <div className={`home-input-search-text ${error}`}>
            <Search
              className="home-input-city-search-text"
              placeholder="Please enter a city or country name"
              onSearch={value => this.searchBylocation(value)}
              enterButton
              onChange={e => {
                this.searchValidation(e);
              }}
            />
            <ErrorModal />
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
