import React, { Component } from "react";
import { HeadingOne } from "../reusableComponents/text";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

//actions
import { loginUser } from "../actions/auth";

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "user_aab",
      email: "",
      password: "abcdf",
      errors: {}
    };
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
  }
  render() {
    return (
      <div className="login mx-auto mt-5">
        <div className="login-left" />
        <div className="login-right">
          <div className="login-right-heading">
            <HeadingOne text="Unlock your tools" />
            <HeadingOne text="to fight fake tools" />
          </div>
          <form className="mt-2" onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Enter Username"
              onChange={this.onChange.bind(this)}
            />
            {/* <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Enter Email"
              onChange={this.onChange.bind(this)}
            /> */}
            <br />
            <input
              type="text"
              name="password"
              value={this.state.password}
              placeholder="Enter Password"
              onChange={this.onChange.bind(this)}
            />
            <br />
            <Button variant="color-primary-one" className="mt-4" type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </div>

      //   <div class="login">
      //     <div class="login-left" />
      //     <div class="login-right">
      //       <form>
      //         <p>fs</p>
      //         <input type="text" placeholder="Enter Email" />
      //         <br />
      //         <input type="text" placeholder="Enter Passworfd" />
      //         <br />
      //         <button type="button">Sign Inn</button>
      //       </form>
      //     </div>
      //   </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginCard);
