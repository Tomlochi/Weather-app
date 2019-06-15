import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import "../styles/Favorites.css";
import { NavLink } from "react-router-dom";

const columns = [
  {
    title: "Location Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <NavLink
        to="/"
        onClick={() => getWeaterData(record.latitude, record.longitude)}
      >
        {text}
      </NavLink>
    )
  },
  {
    title: "City Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Current Weather",
    dataIndex: "currentWeather",
    key: "currentWeather"
  }
];

function getWeaterData(latitude, longitude) {
  weatherStore.location.lon = longitude;
  weatherStore.location.lat = latitude;
  weatherStore.loadWeatherData(latitude, longitude);
}

const weatherStore = rootStores[WeatherStore];
@observer
class Favorites extends Component {
  componentDidMount() {
    weatherStore.getAllFavorites();
  }
  render() {
    const data = weatherStore.favDb;
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Favorites;
