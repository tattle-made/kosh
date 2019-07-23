import React, { Component } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePickerComponent from "../atomic-components/DatePicker";

class DateFilter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span>
        <DatePickerComponent
          date={this.props.startDate}
          onDateChange={this.props.onStartDate}
        />
        <DatePickerComponent
          date={this.props.endDate}
          onDateChange={this.props.onEndDate}
        />
        <Button
          variant="color-primary-one"
          size="sm"
          onClick={this.props.onSearch}
        >
          <FontAwesomeIcon icon={this.props.icons} />
        </Button>
      </span>
    );
  }
}

export default DateFilter;
