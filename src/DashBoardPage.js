import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import './Dashboard.css';
import dashboardImage from './assets/images/dashboard.svg';

const DashboardPage = () => {
  return (
    <Container fluid className="welcome-page">
      <Row className="header bg-white">        
        <Col md="2" className="user-info">         
          <div className="user-details">
            <p>John Doe</p>
            <span className="status">Available</span>
          </div>
           <div className="user-avatar">
            <img src="https://via.placeholder.com/40" alt="User Avatar" />
          </div>
        </Col>
      </Row>

      <Row className="content">
        <Col md="10">
          <h2>Welcome to Demo App</h2>
        </Col>
        <Col md="12" className="text-center">
          <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
        </Col>
      </Row>

      <Row className="footer">
        <Col md="12" className="text-center">
          <p>COPYRIGHT © 2020</p>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;