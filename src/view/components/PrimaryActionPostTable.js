import React, { Component } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import DropDownFilter from "../atomic-components/DropDownFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PrimaryActionTable extends Component {
  constructor(props) {
    super(props);
    this.filterType = this.filterType.bind(this);
  }
  filterType(val) {
    this.props.filter(val);
  }
  render() {
    return (
      <div className="my-3">
        <button className="btn btn-sm btn-color-white-one mr-3">
          <FontAwesomeIcon icon={this.props.faUpload} /> Upload
        </button>
        <Button
          variant="light"
          size="sm"
          onClick={this.props.refresh}
          className="mr-3"
        >
          <FontAwesomeIcon icon={this.props.faSync} />
        </Button>
        <Button variant="color-primary-one" size="sm">
          <FontAwesomeIcon icon={this.props.faDownload} /> Download
        </Button>
        <span className="float-right">
          <DropDownFilter
            selectedItem={this.filterType}
            icon={this.props.faFilter}
          />
        </span>
      </div>
    );
  }
}

export default PrimaryActionTable;
