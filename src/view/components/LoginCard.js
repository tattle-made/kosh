import React, { Component } from "react";
import HeadingOne from "../atomic-components/text/HeadingOne";
import { Button } from "react-bootstrap";

class LoginCard extends Component {
  render() {
    return (
      <div>
        <div className="login mx-auto">
          <div className="login-left" />
          <div className="login-right">
            <div className="login-right-heading">
              <HeadingOne text="Unlock your tools" />
              <HeadingOne text="to fight fake tools" />
            </div>
            <form className="mt-2" onSubmit={this.props.onSubmit}>
              <input
                type="text"
                name="username"
                value={this.props.username}
                placeholder="Username"
                onChange={this.props.onChange}
                // className={classnames("", {
                //   "is-invalid": errors.username
                // })}
              />
              {/* {errors.username && (
                <div className="invalid-feedback d-block">
                  {errors.username}
                </div>
              )} */}
              <br />
              <input
                type="password"
                name="password"
                value={this.props.password}
                placeholder="Password"
                onChange={this.props.onChange}
                // className={classnames("", {
                //   "is-invalid": errors.password
                // })}
              />
              {/* {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password}
                </div>
              )} */}
              <br />
              <Button
                variant="color-primary-one"
                className="mt-4 btn-login-size"
                type="submit"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginCard;
