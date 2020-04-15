import React, { Component } from 'react';
import HeadingOne from '../atomic-components/text/HeadingOne';
import { Card } from 'react-bootstrap';

class PermissionDenied extends Component {
  render() {
    return (
      <div className='permission-denied'>
        <div className='permission-denied-box'>
          <HeadingOne text='Permission Denied' />
        </div>
      </div>
    );
  }
}

export default PermissionDenied;
