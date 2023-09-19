import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SignupView = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://flickpick-1911bf3985c5.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <h1 className="mb-4">Sign Up</h1>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-dark text-white"
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your password must be 8 or more characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label >Birthday:</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter your Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          className="bg-dark text-white"
        />
      </Form.Group>

      <Button className="flickpick-button" type=" submit">
        Submit
      </Button>
    </Form >
  );
};
