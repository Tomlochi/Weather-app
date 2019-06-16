import React, { Component } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";

const weatherStore = rootStores[WeatherStore];
@observer
class ErrorModal extends Component {
  showModal = () => {
    weatherStore.showModal = true;
  };

  handleOk = e => {
    weatherStore.showModal = false;
  };

  handleCancel = e => {
    weatherStore.showModal = false;
  };
  render() {
    return (
      <div>
        <Modal
          title="Error"
          visible={weatherStore.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Location not found</p>
          <p>Please try again</p>
        </Modal>
      </div>
    );
  }
}

export default ErrorModal;
