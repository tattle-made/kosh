import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  FormGroup,
  Form,
  FormControl,
  Input
} from 'react-bootstrap';

import DropDownFilter from '../atomic-components/DropDownFilter';
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
          <Form.Label for='fileUpload'>Upload</Form.Label>
          <Form.Control
            id='fileUpload'
            type='file'
            // accept='.pdf'
            onChange={this.uploadContent}
            style={{ display: 'none' }}
          />
        </Form.Group>

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

        <span className='primary-action-post-table-drop-down'>
          <DropDownFilter
            selectedItem={this.filterType}
            icon={this.props.faFilter}
          />
        </span>
      </div>
    );
  }
}

const PrimaryAction = connect(
  () => ({}),
  { uploadToS3 }
)(PrimaryActionTable);
export default PrimaryAction;
