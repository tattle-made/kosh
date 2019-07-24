import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class UserUpdateForm extends Component {
  render() {
    return (
      <div>
        <Form onSubmit={this.props.onFormSubmit}>
          <Form.Group controlId="username">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              value={this.props.username}
              onChange={this.props.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={this.props.email}
              onChange={this.props.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="roles">
            <Form.Label>Role</Form.Label>
            <Form.Control
              name="role"
              as="select"
              value={this.props.role}
              onChange={this.props.onInputChange}
            >
              <option>Admin</option>
              <option>Subscriber</option>
              <option>Super Admin</option>
              <option>Editor</option>
              <option>Author</option>
              <option>Contributer</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="submit">
            <Button variant="color-primary-one" type="submit">
              Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default UserUpdateForm;
