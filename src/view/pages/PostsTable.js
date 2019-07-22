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
import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import DatePicker from "react-datepicker";
import Select from "react-select";
//actions
import { fetchPosts, fetchUsers } from "../../redux/actions/fetchData";
import {
  postDelete,
  postByTime,
  postByTimeAndUsers
} from "../../redux/actions/post";

//components
import HeadingTwo from "../atomic-components/text/HeadingTwo";
import { Card } from "../components/Card";
import { FilterComponent } from "../components/FilterComponent";
import ReactSelect from "../components/ReactSelect";
// action control
import AccessControl from "../components/AccessControl";

// socket io
import io from "socket.io-client";

//todo import from an external file;
const SHELL_SERVER_API_ENDPOINT = "http://13.233.110.23:8080/posts";

//connect to server
const socket = io("http://localhost:8080/");

class PostsTable extends Component {
  constructor(props) {
    super(props);
    /**
     * consists of 3 state:
     * 1. data
     * 2. loading
     *
     */
    this.state = {
      posts: [],
      page: 1,
      totalPages: 5,
      count: 10,
      loading: true,
      startDate: new Date(),
      endDate: new Date(),
      users: [],
      selectedUsers: [],
      refresh: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.previewFormatter = this.previewFormatter.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onSearchByDate = this.onSearchByDate.bind(this);
    this.onSearchByTimeAndUser = this.onSearchByTimeAndUser.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleChange2(date) {
    this.setState({
      endDate: date
    });
  }

  previewFormatter(cell, row) {
    // console.log("this ", this);
    // console.log("row");
    // console.log(row);
    // console.log("cell");
    // console.log(cell);
    if (row.type == "image") {
      return (
        <div className="card" style={prev}>
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${cell}?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`}
            alt="preview"
          />
        </div>
      );
    } else if (row.type == "video") {
      return (
        // <video
        //   // src={`https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${cell}?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`}
        //   // src={"https://youtu.be/DBXH9jJRaDk"}
        // />
        <div className="card" style={prev}>
          <iframe src="https://www.youtube.com/embed/hZFNVj505HQ" />
        </div>
      );
    } else if (row.type == "text") {
      return (
        <div className="card" style={prev}>
          <div className="card-text">{row.data}</div>
        </div>
      );
    }
  }

  actionIconsFormatter(cell, row, rowIndex, props) {
    // console.log("this ", this);
    return (
      <div>
        <AccessControl
          allowedPermissions={["user:canView"]}
          renderNoAccess={() => console.log("u dont have permission")}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="mr-5"
            onClick={() => {
              props.postDelete(row.id, row.id);
              console.log("delete");
              // this.refresh();
            }}
          />
        </AccessControl>
        <FontAwesomeIcon icon={faCheck} />
      </div>
    );
  }
  componentDidMount() {
    // console.log("mounted");
    // console.log("props", this.props);
    const path = this.props.location.pathname;
    let page = path.split("/posts/")[1];
    if (page === "") {
      page = 1;
    }
    console.log("insidde mount page ", page);
    this.props.fetchPosts(page);

    // SOCKET IO
    // so when new data is received the page will refresh automatically.
    socket.on("posts/newData", value => {
      console.log("new Data received", value.name);
      this.refresh();
    });
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetch !== this.props.fetch) {
      this.setState({
        posts: nextProps.fetch.posts,
        page: nextProps.fetch.page,
        totalPages: nextProps.fetch.totalPages,
        count: nextProps.fetch.count
      });
    }
    if (nextProps.users !== this.props.users) {
      const users = [];
      nextProps.users.forEach(user => {
        users.push({ label: user.username, value: user.id });
      });
      this.setState({
        users
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
    this.props.fetchPosts(this.state.page);
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

  onSearchByDate() {
    console.log("search by date");
    const path = this.props.location.pathname;
    let page = path.split("/posts/")[1];
    if (page === "") {
      page = 1;
    }
    this.props.postByTime(
      page,
      this.state.startDate.getTime(),
      this.state.endDate.getTime()
    );
  }
  onSearchByTimeAndUser() {
    console.log("search by date and user");
    const path = this.props.location.pathname;
    let page = path.split("/posts/")[1];
    if (page === "") {
      page = 1;
    }

    const users_id = [];
    console.log();
    this.state.selectedUsers.forEach(user => users_id.push(user.value));
    this.props.postByTimeAndUsers(
      page,
      users_id,
      this.state.startDate.getTime(),
      this.state.endDate.getTime()
    );
  }
  onTableChange() {
    console.log("table change");
  }

  onPageChange = (page, sizePerPage) => {
    console.log("inside page ", page);
    this.setState({
      page
    });
    // return <Redirect to={`/posts/${page}`} />;
    this.props.history.push(`/posts/${page}`);
    this.props.fetchPosts(page);
  };

  onFilterItemSelect(e) {
    this.setState({
      filter: e.target.name
    });
  }
  filterComponent() {
    const filter = this.state.filter;
    if (filter === "date") {
      return <div />;
    } else if (filter === "name") {
      return <div>name</div>;
    } else if (filter === "label") {
      return <div>label</div>;
    } else {
      return null;
    }
  }

  onUserSelect = selectedUsers => {
    this.setState({ selectedUsers });
    console.log(`Option selected:`, selectedUsers);
  };

  render() {
    if (this.props.location.pathname === "/posts") {
      return <Redirect to="/posts/1" />;
    }
    console.log("page ", this.state.page);

    // SOCKET IO
    // so when new data is received the page will refresh automatically.
    socket.on("posts/newData", value => {
      console.log("new Data received", value.name);
      this.refresh();
    });
    // let selected = [...this.refs.collegeList.selectedOptions].map(o => o.value);
    // console.log("selected ", selected);

    const columns = [
      {
        dataField: "type",
        text: "Title"
        // sort: true
      },
      {
        dataField: "filename",
        text: "Description",
        formatter: this.previewFormatter,
        formatExtraData: this.state.posts,
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            const url = `/post/${row.id}`;
            this.props.history.push(url);
          }
        }
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
        text: "Actions",
        // sort: true
        formatter: this.actionIconsFormatter,
        formatExtraData: this.props
      }
    ];
    // console.log("fasfasf", typeof this.state.page);
    const options = [
      { name: "Swedish", value: "sv" },
      { name: "English", value: "en" },
      {
        type: "group",
        name: "Group name",
        items: [{ name: "Spanish", value: "es" }]
      }
    ];
    return (
      <div className="container">
        <HeadingTwo text="Posts" />
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
          <span className="float-right">
            <Dropdown>
              <Dropdown.Toggle
                variant="color-primary-one"
                size="sm"
                id="dropdown-basic"
              >
                Filter
                <FontAwesomeIcon icon={faFilter} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  name="date"
                  onClick={this.onFilterItemSelect.bind(this)}
                >
                  Filter by Date
                </Dropdown.Item>
                <Dropdown.Item
                  name="name"
                  onClick={this.onFilterItemSelect.bind(this)}
                >
                  Filter by Username
                </Dropdown.Item>
                <Dropdown.Item
                  name="label"
                  onClick={this.onFilterItemSelect.bind(this)}
                >
                  Filter by Label
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
        <div>
          {this.state.filter === "date" ? (
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
          ) : this.state.filter === "name" ? (
            <div className="filter-box">
              <div className="react-select">
                <Select
                  isMulti
                  value={this.state.selectedUsers}
                  onChange={this.onUserSelect}
                  options={this.state.users}
                  //
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
                onClick={this.onSearchByTimeAndUser}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          ) : null}
        </div>
        <BootstrapTable
          striped
          hover
          keyField="id"
          data={this.state.posts ? this.state.posts : []}
          columns={columns}
          filter={filterFactory()}
          remote={{ sort: true, pagination: true }}
          pagination={paginationFactory({
            page: parseInt(this.state.page), // Specify the current page. It's necessary when remote is enabled
            sizePerPage: 10, // Specify the size per page. It's necessary when remote is enabled
            totalSize: this.state.count, // Total data size. It's necessary when remote is enabled
            pageStartIndex: 1, // first page will be 0, default is 1
            paginationSize: 5, // the pagination bar size, default is 5
            showTotal: true, // display pagination information
            sizePerPageList: [
              {
                text: "5",
                value: 5
              },
              {
                text: "10",
                value: 10
              },
              {
                text: "All",
                value: this.state.count
              }
            ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
            withFirstAndLast: false, // hide the going to first and last page button
            alwaysShowAllBtns: true, // always show the next and previous page button
            firstPageText: "First", // the text of first page button
            prePageText: "Prev", // the text of previous page button
            nextPageText: "Next", // the text of next page button
            lastPageText: "Last", // the text of last page button
            nextPageTitle: "Go to next", // the title of next page button
            prePageTitle: "Go to previous", // the title of previous page button
            firstPageTitle: "Go to first", // the title of first page button
            lastPageTitle: "Go to last", // the title of last page button
            hideSizePerPage: true, // hide the size per page dropdown
            hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
            onPageChange: this.onPageChange, // callback function when page was changing
            // onSizePerPageChange: (sizePerPage, page) => {}, // callback function when page size was changing
            paginationTotalRenderer: (from, to, size) => {
              return `Showing ${from} to ${to} of ${size} Results`;
            } // custom the pagination total
          })}
          onTableChange={this.onTableChange}
          // rowEvents={rowEvents}
          // loading={this.state.loading} //only loading is true, react-bootstrap-table will render overlay
          // overlay={overlayFactory()}
        />
      </div>
    );
  }
}

PostsTable.propTypes = {
  fetchPosts: PropTypes.func
};

const mapStateToProps = state => ({
  fetch: state.fetch,
  users: state.users,
  refresh: state.refresh
});

const prev = {
  width: "300px"
};

const PostsTablePage = withRouter(
  connect(
    mapStateToProps,
    { fetchPosts, postDelete, postByTime, fetchUsers, postByTimeAndUsers }
  )(PostsTable)
);
export default PostsTablePage;
