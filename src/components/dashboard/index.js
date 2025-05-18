import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';
import './Dashboard.css';

const DashboardPage = () => {
  return (
    <Container fluid className="welcome-page">
      <Header />
      <Content />
      <Footer />
    </Container>
  );
};

export default DashboardPage; 