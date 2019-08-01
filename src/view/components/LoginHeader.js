import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginHeader extends Component {
  render() {
    return (
      <div className='login-header'>
        <img src={this.props.img} alt={this.props.alt} />
      </div>
    );
  }
}

LoginHeader.propTypes = {
  img: PropTypes.string.isRequired
};

export default LoginHeader;
