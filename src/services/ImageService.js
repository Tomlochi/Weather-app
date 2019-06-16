import axios from "axios";

class ImageService {
  getWeatherBackgroundImage = async location => {
    if (location) {
      const url = `https://source.unsplash.com/600x400/?${location}`;

      try {
        const weather = await axios.get(url);
        if (weather) {
          return weather.config.url;
        }
      } catch (err) {
        throw err;
      }
    }
  };
}

export default new ImageService();
