import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DropDownFilter extends Component {
  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle
            variant="color-primary-one"
            size="sm"
            id="dropdown-basic"
          >
            Filter
            <FontAwesomeIcon icon={this.props.icon} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item name="date" onClick={this.props.onFilterItemSelect}>
              Filter by Date
            </Dropdown.Item>
            <Dropdown.Item name="name" onClick={this.props.onFilterItemSelect}>
              Filter by Username
            </Dropdown.Item>
            <Dropdown.Item name="label" onClick={this.props.onFilterItemSelect}>
              Filter by Label
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default DropDownFilter;
