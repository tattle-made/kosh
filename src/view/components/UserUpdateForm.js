import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UserUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.selectedUser.id,
      username: this.props.selectedUser.username,
      email: this.props.selectedUser.email,
      role: this.props.selectedUser.role
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      email: this.state.email,
      role: this.state.role
    };
    this.props.data(this.state.id, userData);
    this.props.history.push('/users');
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group controlId='username'>
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name='username'
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              name='email'
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group controlId='roles'>
            <Form.Label>Role</Form.Label>
            <Form.Control
              name='role'
              as='select'
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
          <Form.Group controlId='submit'>
            <Button variant='color-primary-one' type='submit'>
              Update
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

UserUpdateForm.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  data: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedUser: state.selectedUser
});

const UserUpdate = withRouter(
  connect(
    mapStateToProps,
    {}
  )(UserUpdateForm)
);

export default UserUpdate;
