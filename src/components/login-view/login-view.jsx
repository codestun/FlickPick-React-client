import React, { useState } from "react";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    // This prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Name: name,
      Password: password
    };

    fetch("https://flickpick-1911bf3985c5.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          dispatch(setUser(data.user));
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert(`Error: ${e.message}`);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <h1 className="mb-4">Log In</h1>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="3"
          className="bg-dark text-white"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
