import { observable, action } from "mobx";

export default class ViewStore {
  @observable appLoadingBoolean = true;
  @observable appLoadingText;

  @action
  setLoading = loadded => {
    this.appLoadingBoolean = loadded;
  };
}
