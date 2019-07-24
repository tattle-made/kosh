import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//actions
import { updateUser } from "../../redux/actions/user";

//components
import BreadCrumb from "../atomic-components/BreadCrumb";
import UserUpdateForm from "../components/UserUpdateForm";

class UserUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.selectedUser.id,
      username: this.props.selectedUser.username,
      email: this.props.selectedUser.email,
      role: this.props.selectedUser.role
    };
  }
  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log("update user submit");
    const userData = {
      username: this.state.username,
      email: this.state.email,
      role: this.state.role
    };
    this.props.updateUser(this.state.id, userData);
    this.props.history.push("/users");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser !== this.props.selectedUser) {
      this.setState({
        username: nextProps.user.username,
        email: nextProps.user.email,
        role: nextProps.user.role
      });
    }
  }
  render() {
    return (
      <div className="container">
        <BreadCrumb />
        <UserUpdateForm
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

const maptStateToProps = state => ({
  selectedUser: state.selectedUser
});

UserUpdate.propTypes = {
  updateUser: PropTypes.func.isRequired
};

const UserUpdateUser = withRouter(
  connect(
    maptStateToProps,
    { updateUser }
  )(UserUpdate)
);

export default UserUpdateUser;
