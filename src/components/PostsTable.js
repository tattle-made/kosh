import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

//actions
import { fetchPosts } from "../actions/fetchData";

class PostsTable extends Component {
  constructor(props) {
    super(props);
    /**
     * consists of 2 state:
     * 1. results.
     * 2. columns.
     */
    this.state = {
      data: [],
      loading: true,
      columns: [
        {
          dataField: "title",
          text: "Title"
          // sort: true
        },
        {
          dataField: "description",
          text: "Description"
          // sort: true
        },
        {
          dataField: "tags",
          text: "Tags",
          // sort: true,
          filter: textFilter(),
          headerAlign: "center"
        },
        {
          dataField: "actions",
          text: "Actions"
          // sort: true
        }
      ]
    };
  }

  componentDidMount() {
    console.log("mounted");
    const url = "http://13.233.110.23:8080/posts";
    console.log("props", this.props);
    this.props.fetchPosts(url);
    console.log("data", this.props.fetch.data);
  }

  //TODO : change this life cycle method.
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetch.data) {
      this.setState({
        data: nextProps.fetch.data
      });
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.fetch) {
  //     return {
  //       data: nextProps.fetch.data,
  //       loading: nextProps.fetch.loading
  //     };
  //   }
  //   else return null;
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevProps.fetch !== )
  // // }

  // rowEvents() {
  //   console.log("row");
  // }
  render() {
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        // console.log(e);
        // console.log(row);
        // console.log(rowIndex);
        const url = `/posts/${row.id}`;
        this.props.history.push(url);
      }
    };
    console.log("hello", this.state.data);
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="my-3">
          <Button variant="primary" size="sm" className="mr-3">
            <FontAwesomeIcon icon={faUpload} /> Upload
          </Button>
          <Button variant="tattle" size="sm">
            <FontAwesomeIcon icon={faDownload} /> Download
          </Button>
        </div>
        <BootstrapTable
          striped
          hover
          keyField="id"
          data={this.state.data}
          columns={this.state.columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
          rowEvents={rowEvents}
        />
      </div>
    );
  }
}

PostsTable.propTypes = {
  fetchPosts: PropTypes.func
};

const mapStateToProps = state => ({
  fetch: state.fetch
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsTable);
