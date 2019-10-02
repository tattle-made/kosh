import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tattleLogo from '../../assets/img/tattle_monogram_dark.png';
import {HeadingTwo} from '../atomic-components/text'
import {Container, Row, Col} from 'react-bootstrap'

class Logo extends Component {
  render() {
    return (
        <div className='logo'>
            <img src={tattleLogo} alt='Tattle Logo' />
        </div>
    );
  }
}

Logo.propTypes = {
  
};

export default Logo;
