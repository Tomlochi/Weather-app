import WeatherStore from "./WeatherStore";

const weatherStore = new WeatherStore();
const rootStores = {
  [WeatherStore]: weatherStore
};

window["stores"] = rootStores;
export default rootStores;
