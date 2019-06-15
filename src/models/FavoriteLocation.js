import { observable } from "mobx";
import isUndefined from "lodash/isUndefined";

export default class FavoriteLocation {
  @observable id;
  @observable name;
  @observable currentWeather;

  constructor(favoriteLocation) {
    if (!isUndefined(favoriteLocation)) {
      this.id = favoriteLocation.id;
      this.name = favoriteLocation.name;
      this.currentWeather = favoriteLocation.currentWeather;
    }
  }
}
