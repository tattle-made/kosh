import React, { Component } from 'react';
import HeadingTwo from '../atomic-components/text/HeadingTwo';
import BodyOne from '../atomic-components/text/BodyOne';
import { faSearch, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    console.log('e ', e);
    const new_list = this.state.content_type;
    if (new_list.includes(e)) {
      new_list.splice(new_list.indexOf(e), 1);
    } else {
      new_list.push(e);
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
      <div className='search-input'>
        <div className='search-input-input'>
          <input type='text' placeholder='Enter Search Term' />
          <HeadingTwo text='or' />
          <button className='btn  btn-color-white-one'>
            <FontAwesomeIcon icon={faUpload} /> Upload File
          </button>
        </div>

        <div className='search-input-checkbox'>
          <BodyOne text='include' />
          <label className='checkbox-box'>
            <BodyOne text='text' />
            <input type='checkbox' onClick={this.checkboxToggle} />
            <span className='checkmark' />
          </label>
          <label className='checkbox-box'>
            <BodyOne text='image' />
            <input type='checkbox' onClick={this.checkboxToggle} />
            <span className='checkmark' />
          </label>
          <label className='checkbox-box'>
            <BodyOne text='video' />
            <input type='checkbox' onClick={this.checkboxToggle} />
            <span className='checkmark' />
          </label>
        </div>
        <Button
          variant='color-primary-one'
          className='text-white'
          type='submit'
          onClick={this.props.onFormSubmit}
        >
          Search <FontAwesomeIcon icon={faSearch} color='#fff' />
        </Button>
      </div>
    );
  }
}

SearchForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
};

export default SearchForm;
