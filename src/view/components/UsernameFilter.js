import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePickerComponent from "../atomic-components/DatePicker";
import Select from "react-select";
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";

class UsernameFilter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="filter-box">
        <div className="react-select">
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
                primary25: "white",
                primary: "#B3B3B3"
              }
            })}
          />
        </div>
        <DatePickerComponent
          date={this.props.startDate}
          onDateChange={this.props.onStartDate}
        />
        <DatePickerComponent
          date={this.props.endDate}
          onDateChange={this.props.onEndDate}
        />
        <div>
          <Button
            variant="color-primary-one"
            size="sm"
            onClick={this.props.onSearchFinal}
          >
            <FontAwesomeIcon icon={this.props.icon} />
          </Button>
        </div>
      </div>
    );
  }
}

export default UsernameFilter;
