import React, { Component } from "react";
import ReactLoading from "react-loading";
import { observer } from "mobx-react";
import "../../styles/AppLoading.css";
import rootStores from "../../stores";
import ViewStore from "../../stores/ViewStore";
import "../../styles/AppLoading.css";

const viewStore = rootStores[ViewStore];
@observer
class AppLoading extends Component {
  render() {
    const hide = viewStore.appLoadingBoolean ? "hide" : "";
    const text = viewStore.appLoadingText
      ? viewStore.appLoadingText
      : "loading";
    return (
      <React.Fragment>
        <div className={`react-loading-main-container ${hide}`}>
          <ReactLoading
            className="react-loading"
            type={"spokes"}
            color={"dodgerblue"}
            height={"50%"}
            width={"17%"}
          />
        </div>
        <div className="app-loading-text-main-contaier">
          <span className={`app-loading-text ${hide}`}>{text}</span>
        </div>
      </React.Fragment>
    );
  }
}
export default AppLoading;
