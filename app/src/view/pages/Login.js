import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//actions
import { loginUser } from '../../redux/actions/auth';

//components
import tattleLogo from '../../assets/img/tattle_monogram_dark.png';
import LoginHeader from '../components/LoginHeader';
import Logo from '../components/Logo'
import LoginFooter from '../components/LoginFooter';
import LoginCard from '../components/LoginCard';

import {Container} from 'react-bootstrap'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      auth: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.auth !== this.props.auth) {
      this.setState({
        auth: nextProps.auth
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  redirect(auth) {
    if (auth) {
      this.props.history.push('/posts');
    }
  }

  render() {
    this.redirect(this.props.auth);

    return (
      <Container className='login-page'>
        <Logo/>

        <br/>

        <LoginCard
          username={this.state.username}
          password={this.state.password}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          loading={this.props.loading}
        />
        <LoginFooter />
      </Container>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.string,
  auth: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth.isAuthenticated,
  loading: state.loading
});

const Login = withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(LoginPage)
);

export default Login;
