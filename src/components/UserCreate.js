import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

//actions
import { createUser } from "../actions/auth";

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      role: ""
    };
  }
  onInputChange(e) {
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
      role: this.state.role
    };
    this.props.createUser(userData);
  }
  render() {
    return (
      <div className="container">
        <Form onSubmit={this.onFormSubmit.bind(this)}>
          <Form.Group controlId="username">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.onInputChange.bind(this)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onInputChange.bind(this)}
            />
          </Form.Group>
          <Form.Group controlId="roles">
            <Form.Label>Role</Form.Label>
            <Form.Control
              name="role"
              as="select"
              value={this.state.role}
              onChange={this.onInputChange.bind(this)}
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
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { createUser }
)(UserCreate);
