import { observable } from "mobx";
import isUndefined from "lodash/isUndefined";
export default class Weather {
  @observable coord;
  @observable sys;
  @observable Weather;
  @observable main;
  @observable wind;
  @observable rain;
  @observable clouds;
  @observable dt;
  @observable id;
  @observable name;
  @observable cod;

  constructor(weather) {
    if (!isUndefined(weather)) {
      this.coord = weather.crood;
      this.sys = weather.sys;
      this.weather = weather.weather;
      this.main = weather.main;
      this.wind = weather.wind;
      this.rain = weather.rain;
      this.clouds = weather.clouds;
      this.dt = weather.dt;
      this.id = weather.id;
      this.cod = weather.cod;
    }
  }
}
