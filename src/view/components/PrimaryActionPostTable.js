import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import DropDownFilter from '../atomic-components/DropDownFilter';
import {
  faUpload,
  faDownload,
  faSync,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadToS3 } from '../../redux/actions/post';

class PrimaryActionTable extends Component {
  constructor(props) {
    super(props);
    this.filterType = this.filterType.bind(this);
    this.uploadContent = this.uploadContent.bind(this);
  }

  filterType(val) {
    this.props.filter(val);
  }

  uploadContent(e) {
    const file = e.target.files[0];
    let fileParts = file.name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    this.props.uploadToS3(file, fileName, fileType);
  }

  render() {
    return (
      <div className='primary-action-post-table'>
        <Form.Group>
          <Form.Label
            className='mr-3 primary-action-post-table-upload'
            htmlFor='fileUpload'
          >
            <FontAwesomeIcon icon={faUpload} /> Upload
          </Form.Label>
          <Form.Control
            id='fileUpload'
            type='file'
            // accept='.pdf'
            onChange={this.uploadContent}
            style={{ display: 'none' }}
          />
        </Form.Group>
        <div>
          <Button
            variant='light'
            size='sm'
            onClick={this.props.refresh}
            className='mr-3'
          >
            <FontAwesomeIcon icon={faSync} />
          </Button>
        </div>
        <div>
          <Button variant='color-primary-one' size='sm'>
            <FontAwesomeIcon icon={faDownload} /> Download
          </Button>
        </div>
        <span className='primary-action-post-table-drop-down'>
          <DropDownFilter selectedItem={this.filterType} icon={faFilter} />
        </span>
      </div>
    );
  }
}

PrimaryActionTable.propTypes = {
  refresh: PropTypes.func,
  filter: PropTypes.func.isRequired,
  uploadToS3: PropTypes.func.isRequired
};

const PrimaryAction = connect(
  () => ({}),
  { uploadToS3 }
)(PrimaryActionTable);
export default PrimaryAction;
