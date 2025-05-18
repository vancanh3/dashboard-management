import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/actions/auth.actions";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Individual field states
  const [firstname, setFirstname] = useState({ value: "", error: "" });
  const [lastname, setLastname] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate all fields on component mount
  useEffect(() => {
    setFirstname((prev) => ({ ...prev, error: validateFirstname(prev.value) }));
    setLastname((prev) => ({ ...prev, error: validateLastname(prev.value) }));
    setEmail((prev) => ({ ...prev, error: validateEmail(prev.value) }));
    setPassword((prev) => ({ ...prev, error: validatePassword(prev.value) }));
  }, []);

  const validateFirstname = (value) => {
    if (!value.trim()) return "First name is required";
    return "";
  };

  const validateLastname = (value) => {
    if (!value.trim()) return "Last name is required";
    return "";
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (
      !/^(?![.])[a-zA-Z0-9._%+-]+(?<![.])@([a-zA-Z0-9-]{3,})\.[a-zA-Z]{2,}$/.test(
        value
      )
    ) {
      return "Email is not valid";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6 || value.length > 18) {
      return "Password must be between 6-18 characters";
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one digit";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must contain at least one special character";
    }
    if (!/[a-zA-Z]/.test(value)) {
      return "Password must contain at least one letter";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstname":
        setFirstname({ value, error: validateFirstname(value) });
        break;
      case "lastname":
        setLastname({ value, error: validateLastname(value) });
        break;
      case "email":
        setEmail({ value, error: validateEmail(value) });
        break;
      case "password":
        setPassword({ value, error: validatePassword(value) });
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (
      !firstname.error &&
      !lastname.error &&
      !email.error &&
      !password.error &&
      firstname.value &&
      lastname.value &&
      email.value &&
      password.value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const firstnameError = validateFirstname(firstname.value);
    const lastnameError = validateLastname(lastname.value);
    const emailError = validateEmail(email.value);
    const passwordError = validatePassword(password.value);

    setFirstname((prev) => ({ ...prev, error: firstnameError }));
    setLastname((prev) => ({ ...prev, error: lastnameError }));
    setEmail((prev) => ({ ...prev, error: emailError }));
    setPassword((prev) => ({ ...prev, error: passwordError }));

    if (!firstnameError && !lastnameError && !emailError && !passwordError) {
      setIsSubmitting(true);
      try {
        await dispatch(
          signup({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
          })
        );
        navigate("/dashboard");
      } catch (error) {
        setSubmitError(
          "Email already exists or an error occurred during signup"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="firstname">Firstname</Label>
        <Input
          id="firstname"
          name="firstname"
          placeholder="johndoe"
          type="text"
          value={firstname.value}
          onChange={handleChange}
          invalid={!!firstname.error}
        />
        {firstname.error && (
          <small className="text-danger">{firstname.error}</small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="lastname">Lastname</Label>
        <Input
          id="lastname"
          name="lastname"
          placeholder="johndoe"
          type="text"
          value={lastname.value}
          onChange={handleChange}
          invalid={!!lastname.error}
        />
        {lastname.error && (
          <small className="text-danger">{lastname.error}</small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="johndoe@gmail.com"
          type="text"
          value={email.value}
          onChange={handleChange}
          invalid={!!email.error}
        />
        {email.error && <small className="text-danger">{email.error}</small>}
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password.value}
          onChange={handleChange}
          invalid={!!password.error}
        />
        {password.error && (
          <small className="text-danger">{password.error}</small>
        )}
      </FormGroup>
      <FormGroup check className="mb-3">
        <Input type="checkbox" />
        <Label check className="ms-2">
          I agree to privacy policy & terms
        </Label>
      </FormGroup>
      {submitError && <div className="text-danger mb-3">{submitError}</div>}
      <Button color="primary" block disabled={!isFormValid() || isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </Form>
  );
};
