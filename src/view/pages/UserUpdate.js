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
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(id, userData) {
    this.props.updateUser(id, userData);
  }

  render() {
    return (
      <div className="container">
        <BreadCrumb />
        <UserUpdateForm
          data={(id, userData) => this.onFormSubmit(id, userData)}
        />
      </div>
    );
  }
}

UserUpdate.propTypes = {
  updateUser: PropTypes.func.isRequired
};

const UserUpdateUser = withRouter(
  connect(
    () => {},
    { updateUser }
  )(UserUpdate)
);

export default UserUpdateUser;
