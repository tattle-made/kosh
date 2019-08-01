import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
// access control
import AccessControl from './AccessControl';

class PrimaryActionUser extends Component {
  render() {
    return (
      <div className='my-3'>
        <button className='btn btn-sm btn-color-white-one mr-3'>
          <FontAwesomeIcon icon={this.props.faUpload} /> Upload
        </button>
        <Button
          variant='light'
          size='sm'
          onClick={this.props.refresh}
          className='mr-3'
        >
          <FontAwesomeIcon icon={this.props.faSync} />
        </Button>
        <Button variant='color-primary-one' size='sm'>
          <FontAwesomeIcon icon={this.props.faDownload} /> Download
        </Button>
        <AccessControl
          allowedPermissions={['user:canCreate']}
          text={() => this.dothis()}
          renderNoAccess={() => {}}
        >
          <Button
            variant='color-primary-one'
            size='sm'
            href='/users/create'
            className='float-right'
          >
            <FontAwesomeIcon icon={this.props.faUser} /> Create New User
          </Button>
        </AccessControl>
      </div>
    );
  }
}

PrimaryActionUser.propTypes = {
  refresh: PropTypes.func.isRequired
};

export default PrimaryActionUser;
