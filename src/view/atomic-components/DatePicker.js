import React, { Component } from "react";
import DatePicker from "react-datepicker";

class DatePickerComponent extends Component {
  render() {
    return (
      <div>
        <DatePicker
          selected={this.props.date}
          onChange={this.props.onDateChange}
          // onChange={() => console.log("1")}
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

export default DatePickerComponent;
