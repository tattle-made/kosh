import React, { Component } from "react";

class LoginHeader extends Component {
  render() {
    return (
      <div className="login-header">
        <img src={this.props.img} alt={this.props.alt} />
      </div>
    );
  }
}

export default LoginHeader;
