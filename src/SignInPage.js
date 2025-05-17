import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faFacebook, faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dashboardSvg from './assets/images/dashboard.svg'

const SingInPage = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const dashboardIcon = require("./assets/images/dashboard.svg");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstname) newErrors.firstname = 'Firstname is required';
    if (!form.lastname) newErrors.lastname = 'Lastname is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', form);
    }
  };

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
          <Form onSubmit={handleSubmit}>            
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" name="email" placeholder="johndoe@gmail.com" type="email"/>
               {errors.email && <small className="text-danger">{errors.email}</small>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input id="password" name="password" placeholder="Enter your password" type="password"/>
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </FormGroup>
            <FormGroup check className="mb-3">
              <Input type="checkbox" />
              <Label check className="ms-2">
                Remember me
              </Label>
            </FormGroup>
            <Button color="primary" block>Sign Up</Button>
          </Form>
          <div className="text-center mt-3">
            <small>New on our platform? <a href="#">Create an account</a></small>
          </div>
          <div className="text-center mt-4">
            <Button color="link" className="text-primary mx-1">
              <FontAwesomeIcon icon={faFacebook} />
            </Button>
            <Button color="link" className="text-info mx-1">
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
            <Button color="link" className="text-danger mx-1">
              <FontAwesomeIcon icon={faGoogle} />
            </Button>
            <Button color="link" className="text-dark mx-1">
              <FontAwesomeIcon icon={faGithub} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SingInPage;
