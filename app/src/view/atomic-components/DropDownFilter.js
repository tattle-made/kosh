import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class DropDownFilter extends Component {
  constructor(props) {
    super(props);
    this.onFilterItemSelect = this.onFilterItemSelect.bind(this);
  }

  onFilterItemSelect(e) {
    this.props.selectedItem(e.target.name);
  }

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant='color-primary-one'
            size='sm'
            id='dropdown-basic'
          >
            Filter
            <FontAwesomeIcon icon={this.props.icon} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item name='date' onClick={this.onFilterItemSelect}>
              Filter by Date
            </Dropdown.Item>
            <Dropdown.Item name='name' onClick={this.onFilterItemSelect}>
              Filter by Username
            </Dropdown.Item>
            <Dropdown.Item name='label' onClick={this.onFilterItemSelect}>
              Filter by Label
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

DropDownFilter.propTypes = {
  selectedItem: PropTypes.func.isRequired
};

export default DropDownFilter;
