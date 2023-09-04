import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function UpdateUser({ user }) {
  const [updatedUser, setUpdatedUser] = useState({
    Name: user.Name,
    Password: "",
    Email: user.Email,
    Birthday: user.Birthday,
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the token from local storage
    const token = localStorage.getItem("token");
    onUpdatedUserInfo(updatedUser, token);
  };

  const onUpdatedUserInfo = (data, token) => {
    fetch(`https://flickpick-1911bf3985c5.herokuapp.com/users/${user.Name}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          window.location.reload();
        } else {
          alert("Update failed");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form className="text-white" onSubmit={handleSubmit}>
      <Form.Group>
        <h4> Update information</h4>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          name="Name"
          type="text"
          defaultValue={user.Name}
          onChange={handleUpdate}
          required
          placeholder="Enter a Name"
          className="placeholder-color text-white"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="Password"
          type="password"
          defaultValue=""
          onChange={handleUpdate}
          required
          minLength="8"
          placeholder="Your password must be 8 or more characters"
          className="placeholder-color text-white"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="Email"
          type="email"
          defaultValue={user.Email}
          onChange={handleUpdate}
          required
          placeholder="Enter your email address"
          className="placeholder-color text-white"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          name="Birthday"
          type="date"
          defaultValue={user.Birthday.split('T')[0]}
          onChange={handleUpdate}
          required
          className="placeholder-color text-white"
        />
      </Form.Group>
      <Button className="btn btn-submit" variant="danger" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateUser;
