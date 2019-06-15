import React, { Component } from "react";
import { Card, Rate } from "antd";
import "../styles/WeatherDetails.css";
import FavoriteLocation from "../models/FavoriteLocation";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import { observer } from "mobx-react";

const weatherStore = rootStores[WeatherStore];

@observer
class WeatherDetails extends Component {
  addToFavorites = () => {
    const data = new FavoriteLocation();
    data.id = this.props.weather.id;
    data.name = this.props.weather.name;
    data.currentWeather = this.props.weather.main.temp;
    data.latitude = this.props.weather.coord.lat;
    data.longitude = this.props.weather.coord.lon;
    weatherStore.addLocationToFavorite(data);
    //weatherStore.removeLocationFromFavorite(data);
  };

  render() {
    return (
      <div className="weather-details-main-continer">
        <Card
          className="weather-details-weather-data-card"
          title={`${this.props.weather.name} Weather Forecast`}
        >
          <div className="weather-details-weather-title">
            <div className="weather-details-weather-title"> temp : </div>
            {this.props.weather.main && this.props.weather.main.temp && (
              <div className="weather-details-weather-data">
                {this.props.weather.main.temp}
              </div>
            )}
          </div>
          <div className="weather-details-weather-title">
            <div className="weather-details-weather-title">
              Max Temperature :
            </div>
            {this.props.weather.main && this.props.weather.main.temp_max && (
              <div className="weather-details-weather-data">
                {this.props.weather.main.temp_max}
              </div>
            )}
          </div>
          <div className="weather-details-weather-title">
            <div className="weather-details-weather-title">
              Min Temperature :
            </div>
            {this.props.weather.main && this.props.weather.main.temp_min && (
              <div className="weather-details-weather-data">
                {this.props.weather.main.temp_min}
              </div>
            )}
          </div>
          <div className="weather-details-weather-title">
            <div className="weather-details-weather-title"> Humidity : </div>
            {this.props.weather.main && this.props.weather.main.humidity && (
              <div className="weather-details-weather-data">
                {this.props.weather.main.humidity}
              </div>
            )}
          </div>
        </Card>
        <div>
          Add {this.props.weather.name} to favorites{" "}
          <Rate
            count={1}
            onChange={() => {
              this.addToFavorites();
            }}
          />
        </div>
      </div>
    );
  }
}

export default WeatherDetails;
