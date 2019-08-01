import React, { Component } from 'react';
import HeadingTwo from '../atomic-components/text/HeadingTwo';
import BodyOne from '../atomic-components/text/BodyOne';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  render() {
    return (
      <div className='search-input'>
        <div className='search-input-input'>
          <input type='text' placeholder='Enter Search Term' />
          <HeadingTwo text='or' />
          <button className='btn  btn-color-white-one'>
            <FontAwesomeIcon icon={this.props.faUpload} /> Upload File
          </button>
        </div>

        <div className='search-input-checkbox'>
          <BodyOne text='include' />
          <label className='checkbox-box'>
            <BodyOne text='text' />
            <input type='checkbox' onClick={this.props.checkboxToggle} />
            <span className='checkmark' />
          </label>
          <label className='checkbox-box'>
            <BodyOne text='image' />
            <input type='checkbox' onClick={this.props.checkboxToggle} />
            <span className='checkmark' />
          </label>
          <label className='checkbox-box'>
            <BodyOne text='video' />
            <input type='checkbox' onClick={this.props.checkboxToggle} />
            <span className='checkmark' />
          </label>
        </div>
        <Button
          variant='color-primary-one'
          className=' text-white'
          type='submit'
          onClick={this.props.onFormSubmit}
        >
          Search <FontAwesomeIcon icon={this.props.faSearch} color='#fff' />
        </Button>
      </div>
    );
  }
}

SearchForm.propTypes = {
  checkboxToggle: PropTypes.func,
  onFormSubmit: PropTypes.func.isRequired
};

export default SearchForm;
