import axios from "axios";

class WeatherService {
  getWeatherData = async (cityName, countryName) => {
    // console.log("cityName,countryName", cityName, countryName);
    if (cityName || countryName) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7ce29d6123a0d66008cf12b0c502470a
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
    const exp = `${cityName},${countryName}`;
    if (cityName || countryName) {
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${exp}&appid=7ce29d6123a0d66008cf12b0c502470a
      `;
      try {
        const weatherForecast = await axios.get(url);
        console.log("weatherForecast", weatherForecast);
        if (weatherForecast && weatherForecast.status) {
          if (weatherForecast.data.list) {
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

  saveAreainFavoritesDb = () => {};

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
