import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignInForm } from './SignInForm';
import { SocialLogin } from '../SignupPage/SocialLogin';
import dashboardSvg from '../../../assets/images/dashboard.svg';

const SignInPage = () => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 rounded overflow-hidden">
        <Col md="6" className="bg-white d-flex align-items-center justify-content-center">
          <img 
            src={dashboardSvg} 
            alt="Illustration" 
            className="img-fluid" 
          />
        </Col>
        <Col md="6" className="bg-white p-5">
          <h3 className="mb-4">Welcome to Entrance Test Interview!</h3>
          <p className="text-muted mb-5">Please sign-in to your account and start the adventure</p>
          <SignInForm />
          <div className="text-center mt-3">
            <small>New on our platform? <a href="/signup">Create an account</a></small>
          </div>
          <SocialLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage; 