import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//components

import UserCreateForm from '../components/UserCreateForm';
//actions
import { createUser } from '../../redux/actions/user';
import BreadCrumb from '../atomic-components/BreadCrumb';

class UserCreate extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(userData) {
    this.props.createUser(userData);
  }

  render() {
    return (
      <div className='container'>
        <BreadCrumb path={this.props.location.pathname} />
        <UserCreateForm data={userData => this.onFormSubmit(userData)} />
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
