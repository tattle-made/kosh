import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DatePickerComponent extends Component {
  render() {
    return (
      <div>
        <DatePicker
          selected={this.props.date}
          onChange={this.props.onDateChange}
          popperModifiers={{
            flip: {
              enabled: false
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false
            }
          }}
        />
      </div>
    );
  }
}

DatePickerComponent.propTypes = {
  data: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired
};

export default DatePickerComponent;
