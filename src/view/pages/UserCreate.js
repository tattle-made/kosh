import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//components

import UserCreateForm from "../components/UserCreateForm";
//actions
import { createUser } from "../../redux/actions/user";
import BreadCrumb from "../atomic-components/BreadCrumb";

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      role: "",
      password: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(e) {
    console.log("e ", e);
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
        <BreadCrumb />
        <UserCreateForm
          username={this.state.username}
          password={this.state.password}
          role={this.state.role}
          email={this.state.email}
          onInputChange={this.onInputChange}
          onFormSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired
};

const UserCreateUser = withRouter(
  connect(
    null,
    { createUser }
  )(UserCreate)
);

export default UserCreateUser;
