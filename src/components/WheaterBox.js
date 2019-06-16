import { blue, cyan, geekblue, green, purple } from "@ant-design/colors";
import { Card, Col, Row, Typography, Button, Icon } from "antd";
import _isUndefined from "lodash/isUndefined";
import { observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import WeatherIcon from "./WeatherIcon";
import FavoriteLocation from "../models/FavoriteLocation";
import PopUp from "./PopUp";
const { Text, Title } = Typography;

const weatherStore = rootStores[WeatherStore];
@observer
class WeatherBox extends Component {
  componentWillMount = async () => {
    await weatherStore.loadBackgroundImage(this.props.weather.name);
  };

  componentDidUpdate = async () => {
    await weatherStore.loadBackgroundImage(this.props.weather.name);
  };

  getNextFiveDays = startDate => {
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let next5days = [];
    for (let i = 0; i < 5; i++) {
      const currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      next5days.push(weekday[currentDate.getDay()]);
    }
    return next5days;
  };

  addToFavorites = () => {
    const data = new FavoriteLocation();
    data.id = this.props.weather.id;
    data.name = this.props.weather.name;
    data.currentWeather = this.props.weather.main.temp;
    data.latitude = this.props.weather.coord.lat;
    data.longitude = this.props.weather.coord.lon;
    weatherStore.addLocationToFavorite(data);
    weatherStore.modalText = "Sucessfully added to favorites";
    weatherStore.showModal = true;
  };

  renderDaysCards = () => {
    const backgroundColors = [green, cyan, blue, geekblue, purple];
    const today = new Date();
    const next5days = this.getNextFiveDays(today);
    return (
      <Fragment>
        {this.props.weatherForecast.list.map((day, index, key) => {
          return (
            <Col key={index} span={24 / 5}>
              <Card
                style={{ backgroundColor: `${backgroundColors[index][3]}` }}
              >
                <Row align="middle">
                  <Col>
                    <Text strong style={{ color: "white" }}>{`${
                      next5days[index]
                    }`}</Text>{" "}
                  </Col>
                  <WeatherIcon
                    name="wi-thermometer"
                    size={2}
                    text={"Temprature"}
                    value={day.main.temp}
                  />
                  <WeatherIcon
                    name="wi-humidity"
                    size={2}
                    text={"Humidty"}
                    value={`${day.main.humidity}%`}
                  />
                  <WeatherIcon
                    name="wi-strong-wind"
                    size={2}
                    text={"Wind Speed"}
                    value={day.wind.speed}
                  />
                </Row>
              </Card>
            </Col>
          );
        })}
      </Fragment>
    );
  };

  renderNowCards = () => {
    return (
      <Fragment>
        <Col span={24}>
          <Card
            cover={
              <img
                alt=""
                src={weatherStore.backImage}
                title="Current Weather in"
              />
            }
          >
            <Text>
              Current weather in :<Title>{this.props.weather.name}</Title>
            </Text>
            <div />
            <Button type="primary" onClick={() => this.addToFavorites()}>
              <Icon type="plus" /> Add To Favorites
            </Button>
            <Row>
              <Col span={8}>
                <WeatherIcon
                  name="wi-thermometer"
                  size={2}
                  text={"Temprature"}
                  value={this.props.weather.main.temp}
                />
              </Col>
              <Col span={8}>
                <WeatherIcon
                  name="wi-humidity"
                  size={2}
                  text={"Humidty"}
                  value={`${this.props.weather.main.humidity}%`}
                />
              </Col>
              <Col span={8}>
                <WeatherIcon
                  name="wi-strong-wind"
                  size={2}
                  text={"Wind Speed"}
                  value={this.props.weather.wind.speed}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Fragment>
    );
  };
  render() {
    return !_isUndefined(this.props.weatherForecast.list) ? (
      <div className="weatherBox-main-container">
        <Row type="flex">{this.renderNowCards()}</Row>
        <Row
          type="flex"
          align={"middle"}
          justify={"center"}
          gutter={{ xs: 8, sm: 16, md: 24 }}
        >
          {this.renderDaysCards()}
        </Row>
        <PopUp />
      </div>
    ) : (
      <div className="weatherBox-main-container">
        <Row type="flex">'Loading'</Row>
      </div>
    );
  }
}

export default WeatherBox;
