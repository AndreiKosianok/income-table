import React from "react";
import { Typography, Row, Col, Divider } from "antd";

import Table from "./pages/Table";

const { Title } = Typography;

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <Title>Test Task for FrontEnd Developer</Title>
    </header>
    <Divider />
    <Row justify="center" align="top">
      <Col span={20}>
        <Table />
      </Col>
    </Row>
  </div>
);

export default App;
