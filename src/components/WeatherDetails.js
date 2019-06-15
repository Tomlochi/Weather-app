import React, { Component } from "react";
import { Card, Rate } from "antd";
import "../styles/WeatherDetails.css";

class WeatherDetails extends Component {
  addToFavorites = () => {
    console.log(this.props.weather.name);
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
