import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form, Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDownload,
  faSync,
  faTrashAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
//components
import HeadingTwo from "../atomic-components/text/HeadingTwo";
//actions
import { createUser } from "../../redux/actions/user";

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      role: "",
      password: ""
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
      role: this.state.role.toLowerCase(),
      password: this.state.password
    };
    this.props.createUser(userData);
    this.props.history.push("/users");
  }

  render() {
    return (
      <div className="container">
        <Breadcrumb>
          <Breadcrumb.Item href="/users">
            <span>
              <HeadingTwo text="Users" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users/create">
            <HeadingTwo text="Create" />
          </Breadcrumb.Item>
          {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
        </Breadcrumb>
        <div className="my-3">
          <button className="btn btn-sm btn-color-white-one mr-3">
            <FontAwesomeIcon icon={faUpload} /> Upload
          </button>
          <Button
            variant="light"
            size="sm"
            onClick={this.refresh}
            className="mr-3"
          >
            <FontAwesomeIcon icon={faSync} />
          </Button>
          <Button variant="color-primary-one" size="sm">
            <FontAwesomeIcon icon={faDownload} /> Download
          </Button>
        </div>
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
          <Form.Group controlId="email">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onInputChange.bind(this)}
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

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired
};

const UserCreateForm = withRouter(
  connect(
    null,
    { createUser }
  )(UserCreate)
);

export default UserCreateForm;
