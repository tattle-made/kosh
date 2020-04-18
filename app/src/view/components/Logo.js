import React, { Component } from 'react';
import tattleLogo from '../../assets/img/tattle_monogram_dark.png';
import {Link} from 'react-router-dom'

class Logo extends Component {
  render() {
    return (
        <div className='logo'>
          <Link to='/'>
            <img className='logo-image' src={tattleLogo} alt='Tattle Logo' />          </Link>
            <div className='company-title'> Tattle </div>
            <div className='product-title'> {this.props.product!==undefined ? this.props.product : ''} </div>
        </div>
    );
  }
}

Logo.propTypes = {
  
};

export default Logo;
