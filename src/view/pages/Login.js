import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { IsEmpty } from "is-empty";

//actions
import { loginUser } from "../../redux/actions/auth";

//components
import tattleLogo from "../../assets/img/logo_logomark.png";
import LoginHeader from "../components/LoginHeader";
import LoginFooter from "../components/LoginFooter";
import LoginCard from "../components/LoginCard";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    console.log("submitted");
    this.props.loginUser(userData);
    // if (true) {
    //   this.props.history.push("/posts");
    //   // this.props.history.push("/posts");
    // }
  }

  redirect(auth) {
    console.log("redirecting to post");
    if (auth) {
      this.props.history.push("/posts");
    }
  }

  render() {
    this.redirect(this.state.auth);
    const errors = this.state.errors;
    console.log("eeeeeeeee", errors);
    return (
      <div className="login-page">
        <LoginHeader img={tattleLogo} alt="tattle-logo" />
        <LoginCard
          username={this.state.username}
          password={this.state.password}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <LoginFooter />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth.isAuthenticated
});

const Login = withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(LoginPage)
);

export default Login;
