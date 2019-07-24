import React, { Component } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePickerComponent from "./DatePicker";

class DateFilter extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    console.log("filter next", nextProps);
  }
  render() {
    console.log("inside filter ", this.props);
    return (
      <span>
        <DatePickerComponent
          date={this.props.startDate1}
          onDateChange={this.props.onStartDate1}
          // onDateChanget={() => console.log("2")}
        />
        <DatePickerComponent
          date={this.props.endDate}
          onDateChange={this.props.onEndDate1}
        />
        <Button
          variant="color-primary-one"
          size="sm"
          onClick={this.props.onSearch}
        >
          <FontAwesomeIcon icon={this.props.icon} />
        </Button>
      </span>
    );
  }
}

export default DateFilter;
