import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tattleLogo from '../../assets/img/tattle_monogram_dark.png';
import {HeadingTwo} from '../atomic-components/text'
import {Container, Row, Col} from 'react-bootstrap'

class Logo extends Component {
  render() {
    return (
        <div className='logo'>
            <img className='logo-image' src={tattleLogo} alt='Tattle Logo' />
            <div className='company-title'> Tattle </div>
            <div className='product-title'> {this.props.product!=undefined ? this.props.product : ''} </div>
        </div>
    );
  }
}

Logo.propTypes = {
  
};

export default Logo;
