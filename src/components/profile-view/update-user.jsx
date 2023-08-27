import React from "react";
import { Form, Button } from "react-bootstrap";

function UpdateUser({ handleSubmit, handleUpdate, user }) {
  const onUpdatedUserInfo = (data) => {
    fetch(`https://flickpick-1911bf3985c5.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
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
    <Form className="profile-form text-white" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <h4> Update information</h4>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={user.Name}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter a Name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          defaultValue=""
          onChange={(e) => handleUpdate(e)}
          required
          minLength="8"
          placeholder="Your password must be 8 or more characters"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          defaultValue={user.Email}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter your email address"
        />
      </Form.Group>
      <Button className="btn btn-submit" variant="primary" type="submit"
        onClick={handleSubmit}>
        Update
      </Button>
    </Form>
  );
}

export default UpdateUser;
