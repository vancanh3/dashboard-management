import React from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignupForm } from "./SignupForm";
import { SocialLogin } from "./SocialLogin";

const SignUpPage = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
    >
      <Row className="w-100  rounded overflow-hidden">
        <Col
          md="6"
          className="bg-white d-flex align-items-center justify-content-center"
        >
          <img
            src="https://epay.dongamoneytransfer.com.vn/assets/images/pages/register-v2.svg"
            alt="Illustration"
            className="img-fluid"
          />
        </Col>
        <Col md="6" className="bg-white p-5">
          <h3 className="mb-4">Adventure starts here</h3>
          <p className="text-muted mb-5">
            Make your app management easy and fun!
          </p>
          <SignupForm />
          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/">Sign in instead</a>
            </small>
          </div>
          <SocialLogin />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
