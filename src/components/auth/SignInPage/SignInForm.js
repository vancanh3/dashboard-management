import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { signin } from "../../../redux/actions/auth.actions";

export const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/dashboard";

  // Individual field states
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail((prev) => ({ ...prev, error: validateEmail(prev.value) }));
    setPassword((prev) => ({ ...prev, error: validatePassword(prev.value) }));
  }, []);

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
    return !email.error && !password.error && email.value && password.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email.value);
    const passwordError = validatePassword(password.value);

    setEmail((prev) => ({ ...prev, error: emailError }));
    setPassword((prev) => ({ ...prev, error: passwordError }));

    if (!emailError && !passwordError) {
      setIsSubmitting(true);
      try {
        await dispatch(
          signin({
            email: email.value,
            password: password.value,
          })
        );
        navigate(from, { replace: true });
      } catch (error) {
        setSubmitError(
          "Invalid email/password combination or an error occurred during signin"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          Remember me
        </Label>
      </FormGroup>
      {submitError && <div className="text-danger mb-3">{submitError}</div>}
      <Button color="primary" block disabled={!isFormValid() || isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </Form>
  );
};
