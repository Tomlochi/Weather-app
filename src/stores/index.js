import WeatherStore from "./WeatherStore";
import ViewStore from "./ViewStore";

const viewStore = new ViewStore();
const weatherStore = new WeatherStore();
const rootStores = {
  [WeatherStore]: weatherStore,
  [ViewStore]: viewStore
};

window["stores"] = rootStores;
export default rootStores;
