import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDB } from "../context/DBContext";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const userNameRef = useRef();
  const userAdressRef = useRef();
  const userPhoneNumRef = useRef();
  const { signup } = useAuth();
  const { signupUserOnStore } = useDB();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const user = {
        email_adress: emailRef.current.value,
        name: userNameRef.current.value,
        adress: userAdressRef.current.value,
        phone_number: userPhoneNumRef.current.value
      }
      await signupUserOnStore(user)
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="fullName">
              <Form.Label>Full-Name</Form.Label>
              <Form.Control type="text" ref={userNameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="adress">
              <Form.Label>Adress</Form.Label>
              <Form.Control type="text" ref={userAdressRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" ref={userPhoneNumRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password-confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
