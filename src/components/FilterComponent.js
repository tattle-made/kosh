import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDownload,
  faSync,
  faTrashAlt,
  faCheck,
  faSearch,
  faFilter
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { Button, Dropdown } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import axios from "axios";
import DatePicker from "react-datepicker";

const FilterComponent = ({ filter }) => {
  if (filter === "data") {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          // popperPlacement="botom-start"
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
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleChange2}
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
        <Button
          variant="color-primary-one"
          size="sm"
          onClick={this.onSearchByDate}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    );
  } else {
    return null;
  }
};

export default FilterComponent;
