import React, { Component } from "react";
import { Table } from "antd";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import "../styles/Favorites.css";
import { NavLink } from "react-router-dom";
import ViewStore from "../stores/ViewStore";

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
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div
        className="favorites-item-clickable"
        onClick={() => removeLocation(record)}
      >
        Delete
      </div>
    )
  }
];

function removeLocation(location) {
  weatherStore.removeLocationFromFavorite(location);
  weatherStore.getAllFavorites();
}

async function getWeaterData(latitude, longitude) {
  weatherStore.location.lon = longitude;
  weatherStore.location.lat = latitude;
  viewStore.setLoading(false);
  weatherStore.loadWeather().then(() => {
    viewStore.setLoading(true);
  });
}
const viewStore = rootStores[ViewStore];
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
