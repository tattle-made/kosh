import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      role: "subscriber",
      password: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    // console.log("e ", e);
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log("create user submit");
    const userData = {
      username: this.state.username,
      email: this.state.email,
      role: this.state.role.toLowerCase(),
      password: this.state.password
    };
    this.props.data(userData);
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group controlId="username">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="roles">
            <Form.Label>Role</Form.Label>
            <Form.Control
              name="role"
              as="select"
              value={this.state.role}
              onChange={this.onInputChange}
            >
              <option>Subscriber</option>
              <option>Admin</option>
              <option>Super Admin</option>
              <option>Editor</option>
              <option>Author</option>
              <option>Contributer</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId="submit">
            <Button variant="color-primary-one" type="submit">
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const UserForm = withRouter(UserCreateForm);

export default UserForm;
