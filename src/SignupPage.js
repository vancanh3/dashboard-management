import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    // First name validation
    if (!form.firstname) {
      newErrors.firstname = "First name is required";
    }

    // Last name validation
    if (!form.lastname) {
      newErrors.lastname = "Last name is required";
    }

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Email is not valid";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else {
      if (form.password.length < 6 || form.password.length > 18) {
        newErrors.password = "Password must be between 6-18 characters";
      } else if (!/\d/.test(form.password)) {
        newErrors.password = "Password must contain at least one digit";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
        newErrors.password =
          "Password must contain at least one special character";
      } else if (!/[a-zA-Z]/.test(form.password)) {
        newErrors.password = "Password must contain at least one letter";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validate()) {
    //   setIsSubmitting(true);
    //   try {
    //     // Call signup API
    //     const signupResponse = await axios.post('/api/auth/signup', form);

    //     if (signupResponse.data.success) {
    //       // Call signin API
    //       const signinResponse = await axios.post('/api/auth/signin', {
    //         email: form.email,
    //         password: form.password
    //       });

    //       if (signinResponse.data.success) {
    //         // Save tokens to browser storage
    //         localStorage.setItem('accessToken', signinResponse.data.accessToken);
    //         localStorage.setItem('refreshToken', signinResponse.data.refreshToken);

    //         // Navigate to dashboard
    //         navigate('/dashboard');
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Signup/Signin error:', error);
    //     setErrors({
    //       ...errors,
    //       submit: error.response?.data?.message || 'An error occurred during signup'
    //     });
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // }
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      form.firstname &&
      form.lastname &&
      form.email &&
      form.password
    );
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
    >
      <Row className="w-75 shadow rounded overflow-hidden">
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
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="firstname">Firstname</Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="johndoe"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                invalid={!!errors.firstname}
              />
              {errors.firstname && (
                <small className="text-danger">{errors.firstname}</small>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Lastname</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="johndoe"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                invalid={!!errors.lastname}
              />
              {errors.lastname && (
                <small className="text-danger">{errors.lastname}</small>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
                type="email"
                value={form.email}
                onChange={handleChange}
                invalid={!!errors.email}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={form.password}
                onChange={handleChange}
                invalid={!!errors.password}
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </FormGroup>
            <FormGroup check className="mb-3">
              <Input type="checkbox" />
              <Label check className="ms-2">
                I agree to privacy policy & terms
              </Label>
            </FormGroup>
            {errors.submit && (
              <div className="text-danger mb-3">{errors.submit}</div>
            )}
            <Button
              color="primary"
              block
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/signin">Sign in instead</a>
            </small>
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

export default SignUpPage;
