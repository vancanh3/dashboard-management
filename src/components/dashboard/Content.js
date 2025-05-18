import React from "react";
import { Row, Col } from "reactstrap";
import dashboardImage from "../../assets/images/dashboard.svg";

export const Content = () => {
  return (
    <Row className="content">
      <Col md="12">
        <p>Welcome to Demo App</p>
      </Col>
      <Col md="12" className="text-center">
        <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
      </Col>
    </Row>
  );
};
