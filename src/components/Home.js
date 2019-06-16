import { Col, Row } from "antd";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import "../styles/Home.css";
import SearchWeather from "./SearchWeather";
import WeatherBox from "./WheaterBox";
import ViewStore from "../stores/ViewStore";

const weatherStore = rootStores[WeatherStore];
const viewStore = rootStores[ViewStore];
@observer
class Home extends Component {
  componentDidMount() {
    viewStore.setLoading(false);
    weatherStore.loadWeather().then(() => {
      viewStore.setLoading(true);
    });
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
        viewStore.setLoading(false);
        weatherStore.loadWeather().then(() => {
          viewStore.setLoading(true);
        });
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
          <Row className="home-main-row" type="flex" justify="center">
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
