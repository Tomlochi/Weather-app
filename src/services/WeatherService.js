import axios from "axios";

class WeatherService {
  getWeatherData2 = async (cityName, countryName) => {
    console.log("cityName,countryName", cityName, countryName);
    if (cityName || countryName) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=7ce29d6123a0d66008cf12b0c502470a
      `;
      try {
        const weather = await axios.get(url);
        if (weather) {
          return weather;
        }
      } catch (err) {
        throw err;
      }
    }
  };

  getWeatherData = async (lat, lon) => {
    if (lat && lon) {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ce29d6123a0d66008cf12b0c502470a
      `;
      try {
        const weather = await axios.get(url);
        if (weather) {
          return weather;
        }
      } catch (err) {
        throw err;
      }
    }
  };

  getWeatherForecast = async (cityName, countryName) => {
    const list = [];
    var index = 0;
    if (cityName || countryName) {
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryName}&appid=7ce29d6123a0d66008cf12b0c502470a
      `;
      try {
        const weatherForecast = await axios.get(url);
        console.log("weatherForecast", weatherForecast);
        if (weatherForecast && weatherForecast.status) {
          if (weatherForecast.data.list) {
            //TODO traslate to lodash filter
            for (let i = 0; i < weatherForecast.data.list.length; i++) {
              if (i % 8 === 0) {
                list[index] = weatherForecast.data.list[i];
                index++;
              }
            }
          }
          weatherForecast.data.list = list;
          return weatherForecast;
        }
      } catch (err) {
        throw err;
      }
    }
  };

  saveLocationinTOFavoritesDb = location => {
    localStorage.setItem("favoritesDb", JSON.stringify(location));
  };

  removeLocationFromFavoritesDb = location => {
    localStorage.removeItem("favoritesDb", JSON.stringify(location));
  };

  googlePlaceSearch = async () => {
    const url = " https://api.teleport.org/api/cities/?search=san%20francisco";
    try {
      const placeSearch = await axios.get(url);
      if (placeSearch) {
        // console.log("place search in servcie ", placeSearch);
        return placeSearch;
      }
    } catch (err) {
      throw err;
    }
  };
}

export default new WeatherService();
