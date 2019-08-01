import React, { Component } from 'react';
import DateFilter from './DateFilter';
import Select from 'react-select';
import PropTypes from 'prop-types';

class UsernameFilter extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(data) {
    this.props.time(data);
  }
  render() {
    return (
      <span className='filter-box'>
        <div className='react-select'>
          <Select
            isMulti
            value={this.props.selectedUsers}
            onChange={this.props.onUserSelect}
            options={this.props.users}
            // styeles={{ width: "500px" }}
            theme={theme => ({
              ...theme,
              // borderRadius: {"4px"},
              colors: {
                ...theme.colors,
                primary25: 'white',
                primary: '#B3B3B3'
              }
            })}
          />
        </div>
        <div>
          <DateFilter time={data => this.onSearch(data)} />
        </div>
      </span>
    );
  }
}

UsernameFilter.propTypes = {
  users: PropTypes.object,
  time: PropTypes.func.isRequired,
  selectedUsers: PropTypes.object,
  onUserSelect: PropTypes.func.isRequired
};

export default UsernameFilter;
