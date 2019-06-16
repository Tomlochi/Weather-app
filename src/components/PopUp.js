import React, { Component } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import rootStores from "../stores";
import WeatherStore from "../stores/WeatherStore";

const weatherStore = rootStores[WeatherStore];
@observer
class PopUp extends Component {
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
          title="Please notice !"
          visible={weatherStore.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p>{weatherStore.modalText}</p>
        </Modal>
      </div>
    );
  }
}

export default PopUp;
