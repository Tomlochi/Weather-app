import React, { Component } from "react";
import { Layout } from "antd";

import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import "../../styles/Master.css";
import Home from "../Home";
import Favorites from "../Favorites";
import { observer } from "mobx-react";
import CustomMenu from "./CustomMenu";

const { Footer, Content } = Layout;

@observer
class Master extends Component {
  render() {
    return (
      <Layout className="layout">
        <CustomMenu history={this.props.history} />
        <Content className="content-container">
          <Switch>
            <Route path={"/"} exact component={Home} />
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
