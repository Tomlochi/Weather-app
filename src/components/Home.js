import { Col, Row } from "antd";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import "../styles/Home.css";
import SearchWeather from "./SearchWeather";
import WeatherBox from "./WheaterBox";

const weatherStore = rootStores[WeatherStore];
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

  render() {
    const weather = weatherStore.weatherData;
    const weatherForecast = weatherStore.weatherForecast;
    if (weather && weatherForecast) {
      return (
        <div className="home-main-container">
          <Row type="flex" justify="center" style={{ marginBottom: 20 }}>
            <Col>
              <SearchWeather />
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <WeatherBox weatherForecast={weatherForecast} weather={weather} />
          </Row>
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
