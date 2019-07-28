import React, { Component } from "react";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DatePickerComponent from "./DatePicker";

class DateFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  onEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  onSearch() {
    console.log("datefilter");
    this.props.time({
      from: this.state.startDate,
      to: this.state.endDate
    });
  }

  render() {
    console.log("inside filter ", this.props);
    return (
      <div className="filter-box">
        <DatePickerComponent
          name="startDate"
          date={this.state.startDate}
          onDateChange={this.onStartDateChange}
        />

        <DatePickerComponent
          name="endDate"
          date={this.state.endDate}
          onDateChange={this.onEndDateChange}
        />
        <Button variant="color-primary-one" size="sm" onClick={this.onSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    );
  }
}

export default DateFilter;
