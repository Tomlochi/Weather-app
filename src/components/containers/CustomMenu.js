import React, { Component } from "react";
import { Menu, Icon, Col, Row } from "antd";
import "../../styles/CustomMenu.css";
const config = require("../../configuration.json");
const heroloLogo = require("../../assets/herolo-logo.png");

export default class CustomMenu extends Component {
  handleMenuClicked = path => this.props.history.push(path);
  onRedirectToHeroloaWebSite = () => {
    window.open(config.heroloWebSite);
  };
  render() {
    return (
      <div className="custom-menu-main-container">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys="2"
          className="menu-master"
        >
          <Col span={6}>
            <Menu.Item
              className="logo"
              key="1"
              onClick={() => this.onRedirectToHeroloaWebSite()}
            >
              <img alt="logo" src={heroloLogo} className="herolo-logo" />
            </Menu.Item>
          </Col>
          <Col span={18}>
            <Row type="flex" className="tab-container">
              <Menu.Item
                className="tab"
                key="2"
                onClick={() => this.handleMenuClicked("/")}
              >
                <Icon className="icon" fontSize={16} type="home" />
                Home
              </Menu.Item>
              <Menu.Item
                key="3"
                className="tab"
                onClick={() => this.handleMenuClicked("/favorites")}
              >
                <Icon className="icon" fontSize={16} type="star" />
                Favorites
              </Menu.Item>
            </Row>
          </Col>
        </Menu>
      </div>
    );
  }
}
