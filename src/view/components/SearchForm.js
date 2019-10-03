import React, { Component } from 'react';

import { faSearch, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import {HeadingOne, HeadingTwo, HeadingThree, BodyOne, BodyTwo, SubHeadingOne} from '../atomic-components/text'
import { Button, Form,  Container, Row, Col, Spinner } from 'react-bootstrap';
import StatefulButton from '../atomic-components/StatefulButton'

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      selectedOption: 'text',
      content_type: []
    };
    this.checkboxToggle = this.checkboxToggle.bind(this);
  }

  onInputChange(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  checkboxToggle(e) {
    const type = e.target.name;
    const new_list = this.state.content_type;
    if (new_list.includes(type)) {
      new_list.splice(new_list.indexOf(type), 1);
    } else {
      new_list.push(type);
    }
    this.setState({
      content_type: new_list
    });
  }

  handleChange(e) {
    this.setState({ selectedOption: e.value });
  }

  render() {
    return (
        <Form onSubmit={this.props.onFormSubmit}>
          <Form.Row className="mb-1">
            <Col md={'auto'}>
              <Form.Control 
                name="username"
                type='text' 
                placeholder='Enter Search Term'
                onChange={this.props.onChange}
              />
            </Col>
            <Col md={'auto'}>
              <BodyOne text='or'/>
            </Col>
            <Col block>
              
            <Form.Group>
              <Form.Label
                className='pl-4 pr-4 pt-2 pb-2 primary-action-post-table-upload'
                htmlFor='fileUpload'
              >
                <FontAwesomeIcon icon={faUpload} /> Upload File
              </Form.Label>
              <Form.Control
                id='fileUpload'
                type='file'
                // accept='.pdf'
                onChange={this.uploadContent}
                style={{ display: 'none' }}
              />
            </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row className="mb-4">
            <Col>
              <div className="d-inline mr-2">include</div>
              <Form.Check
                custom
                inline
                label="text"
                type={'checkbox'}
                id={`search-type-text`}
              />
              <Form.Check
                custom
                inline
                label="image"
                type={'checkbox'}
                id={`search-type-image`}
              />
              <Form.Check
                custom
                inline
                label="video"
                type={'checkbox'}
                id={`search-type-video`}
              />
            </Col>
          </Form.Row>

          <StatefulButton 
            status='default'
            label='Search'
            errorMessage='There was an error'
          />
         </Form>
    );
  }
}

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};

export default SearchForm;
