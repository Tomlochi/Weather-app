import { gold } from "@ant-design/colors";
import { Card, Typography } from "antd";
import React from "react";
// eslint-disable-next-line
import WeatherIcon from "react-icons-weather";
const { Text } = Typography;

const WeatherComponent = props => {
  return (
    <div>
      <Card style={{ border: "none", backgroundColor: "transparent" }}>
        <i
          className={`wi ${props.name}`}
          style={{
            fontSize: `${props.size}em`,
            color: gold[5],
            marginRight: 10,
            marginButtom: 20
          }}
        />

        <br />
        <Text strong>{props.text}</Text>
        <br />

        <Text>{props.value}</Text>
      </Card>
    </div>
  );
};
export default WeatherComponent;
