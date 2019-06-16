import React, { Component } from "react";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";
import { Input } from "antd";
import PopUp from "./PopUp";
import ViewStore from "../stores/ViewStore";
const config = require("../configuration.json");

const Search = Input.Search;

const weatherStore = rootStores[WeatherStore];
const viewStore = rootStores[ViewStore];
@observer
class SearchWeather extends Component {
  searchBylocation = async location => {
    if (location && !weatherStore.errorValidation) {
      try {
        viewStore.setLoading(false);
        await weatherStore.googlePlaceSearchApi(location);
      } catch (err) {
        throw err;
      } finally {
        weatherStore.loadWeather();
        viewStore.setLoading(true);
      }
    } else {
      weatherStore.modalText = config.errorMessage;
      weatherStore.showModal = true;
    }
  };

  searchValidation = e => {
    if (/[^a-zA-Z\s]/.test(e.target.value)) {
      weatherStore.modalText = config.errorMessage;
      weatherStore.errorValidation = true;
    } else {
      weatherStore.errorValidation = false;
    }
  };

  render() {
    const error = weatherStore.errorValidation ? "error" : "";
    return (
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

        <PopUp />
      </div>
    );
  }
}

export default SearchWeather;
