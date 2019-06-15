import React, { Component } from "react";
import { Layout, Menu, Icon, Col, Row } from "antd";

import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import "../../styles/Master.css";
import Home from "../Home";
import Favorites from "../Favorites";
import { observer } from "mobx-react";

const { Footer, Content } = Layout;
const heroloLogo = require("../../assets/herolo-logo.png");
@observer
class Master extends Component {
  handleMenuClicked = path => this.props.history.push(path);

  onRedirectToHeroloaWebSite = () => {
    window.open("https://herolo.co.il/");
  };

  render() {
    return (
      <Layout className="layout">
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
                onClick={() => this.handleMenuClicked("/home")}
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
        <Content className="content-container">
          <Switch>
            <Route path={"/home"} exact component={Home} />
            <Route path={"/favorites"} exact component={Favorites} />
          </Switch>
        </Content>
        <Footer className="footer">
          Weather App ©2019 Created by Tom Lochi.
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(Master);
