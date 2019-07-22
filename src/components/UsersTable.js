import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDownload,
  faSync,
  faTrashAlt,
  faCheck,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Breadcrumb } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

//actions
import { fetchUsers } from "../actions/fetchData";
import { userDelete, selectedUser } from "../actions/user";

//components
import { HeadingTwo } from "../reusableComponents/text/HeadingTwo";
import { Card } from "./Card";

// action control
import AccessControl from "./accessControl";

// socket io
import io from "socket.io-client";

//todo import from an external file;
const SHELL_SERVER_API_ENDPOINT = "http://13.233.110.23:8080/posts";

//connect to server
const socket = io("http://localhost:3001/");

class UsersTable extends Component {
  constructor(props) {
    super(props);
    /**
     * consists of 3 state:
     * 1. data
     * 2. loading
     * 3. columns
     */
    this.state = {
      users: [],
      loading: true,
      refresh: false,
      columns: [
        {
          dataField: "username",
          text: "Username"
          // sort: true
        },
        {
          dataField: "email",
          text: "Email",
          formatter: this.previewFormatter
        },
        {
          dataField: "role",
          text: "Role",
          // sort: true,
          filter: textFilter(),
          headerAlign: "center"
        },
        {
          dataField: "posts",
          text: "Posts",
          // sort: true,
          filter: textFilter(),
          headerAlign: "center"
        },
        {
          dataField: "actions",
          text: "Actions",
          // sort: true
          formatter: this.actionIconsFormatter,
          formatExtraData: this.props
        }
      ]
    };

    this.refresh = this.refresh.bind(this);
    this.actionIconsFormatter = this.actionIconsFormatter.bind(this);
  }

  actionIconsFormatter(cell, row, rowIndex, props) {
    console.log("props actonformatter", props);
    return (
      <div>
        <AccessControl
          allowedPermissions={["user:canView"]}
          text={() => this.dothis()}
          renderNoAccess={() => console.log("u dont have permission")}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="mr-2"
            onClick={() => {
              props.userDelete(row.id, row.id);
            }}
          />
        </AccessControl>
        <FontAwesomeIcon
          icon={faEdit}
          className="mr-2"
          onClick={() => {
            props.selectedUser(row);
            props.history.push(`/users/update/${row.id}`);
          }}
        />
        <FontAwesomeIcon icon={faCheck} />
      </div>
    );
  }

  componentDidMount() {
    console.log("mounted");
    this.props.fetchUsers();
    this.setState({
      users: this.props.users
    });
    // SOCKET IO
    // so when new data is received the page will refresh automatically.
    socket.on("users/newData", value => {
      console.log("new Data received", value.name);
      this.refresh();
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("will recieve new props", nextProps);
    if (nextProps.users !== this.props.users) {
      this.setState({
        users: nextProps.users
      });
    }
    if (nextProps.refresh !== this.props.refresh) {
      this.setState({
        refresh: nextProps.refresh
      });
      this.refresh();
    }
  }
  refresh() {
    console.log("refreshing");
    this.props.fetchUsers();
  }

  //TODO : change this life cycle method.

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
    // const rowEvents = {
    //   onClick: (e, row, rowIndex) => {
    //     // console.log(e);
    //     // console.log(row);
    //     // console.log(rowIndex);
    //     const url = `/posts/${row.id}`;
    //     this.props.history.push(url);
    //   }
    // };

    console.log("hello state", this.state.users);
    console.log("hello props", this.props.users);
    return (
      <div className="container">
        {/* {//the color of posts in heading 2 is black , and in spec file posts title color is # #060D42;} */}

        <Breadcrumb>
          <Breadcrumb.Item href="/users">
            <span>
              <HeadingTwo text="Users" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users/create">
            <HeadingTwo text="Create" />
          </Breadcrumb.Item>
          {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
        </Breadcrumb>
        <div className="my-3">
          <button className="btn btn-sm btn-color-white-one mr-3">
            <FontAwesomeIcon icon={faUpload} /> Upload
          </button>
          <Button
            variant="light"
            size="sm"
            onClick={this.refresh}
            className="mr-3"
          >
            <FontAwesomeIcon icon={faSync} />
          </Button>
          <Button variant="color-primary-one" size="sm">
            <FontAwesomeIcon icon={faDownload} /> Download
          </Button>
        </div>
        <BootstrapTable
          striped
          hover
          keyField="id"
          // we cannot directly use this.props.fetchUsers, this will give data=[] empty array
          // we need to set the data using state, and whever new data from fetchUsers is arrived via
          // props.users defined in mapStateToProps we can use lifecycle method to update the state
          // which will re-render the component and will show the updated data in the table.
          data={this.state.users}
          columns={this.state.columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
          // rowEvents={rowEvents}
        />
      </div>
    );
  }
}

UsersTable.propTypes = {
  fetchUsers: PropTypes.func,
  userDelete: PropTypes.func
};

const mapStateToProps = state => ({
  users: state.users,
  refresh: state.refresh
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchUsers, userDelete, selectedUser }
  )(UsersTable)
);

const prev = {
  width: "300px"
};
