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
import { textFilter } from "react-bootstrap-table2-filter";

//actions
import { fetchUsers } from "../../../redux/actions/user";
import { fetchPosts } from "../../../redux/actions/post";
import {
  postDelete,
  postByTime,
  postByTimeAndUsers
} from "../../../redux/actions/post";

//components
import HeadingTwo from "../../atomic-components/text/HeadingTwo";
import Table from "../../components/Table";
import DateFilter from "../../atomic-components/DateFilter";
import UsernameFilter from "../../atomic-components/UsernameFilter";
import PrimaryActionTable from "../../components/PrimaryActionTable";

// action control
import AccessControl from "../../components/AccessControl";

// socket io
import io from "socket.io-client";
import PreviewFormatterTable from "../../components/PreviewFormatterTable";
import SearchPostFilterParameters from "../../components/SearchPostFilterParameters";

//connect to server
const socket = io("http://localhost:8080/");

class PostsTable extends Component {
  constructor(props) {
    super(props);
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
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.previewFormatter = this.previewFormatter.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onSearchByDate = this.onSearchByDate.bind(this);
    this.onSearchByTimeAndUser = this.onSearchByTimeAndUser.bind(this);
    this.onFilterItemSelect = this.onFilterItemSelect.bind(this);
  }

  onStartDateChange(date) {
    console.log("start date change", date);
    this.setState({
      startDate: date
    });
  }
  onEndDateChange(date) {
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
    return <PreviewFormatterTable row={row} cell={cell} />;
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
      nextProps.users.data.forEach(user => {
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

  //TODO : change to this life cycle method.

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
    console.log("search by date and userrrrrrrrrrrrrrrrrrrr");
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

    const columns = [
      {
        dataField: "type",
        text: "Title"
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
        filter: textFilter(),
        headerAlign: "center"
      },
      {
        dataField: "actions",
        text: "Actions",
        formatter: this.actionIconsFormatter,
        formatExtraData: this.props
      }
    ];

    return (
      <div className="container">
        <HeadingTwo text="Posts" />
        <PrimaryActionTable
          faUpload={eval(faUpload)}
          faDownload={eval(faDownload)}
          faFilter={eval(faFilter)}
          faSync={eval(faSync)}
          refresh={this.refresh}
          onFilterItemSelect={this.onFilterItemSelect}
        />

        <SearchPostFilterParameters
          filter={this.state.filter}
          startDate2={this.state.startDate}
          endDate2={this.state.endDate}
          onSearch={this.onSearchByDate}
          onStartDate2={this.onStartDateChange}
          onEndDate2={this.onEndDateChange}
          icon={eval(faSearch)}
          users={this.state.users}
          selectedUsers={this.state.selectedUsers}
          onUserSelect={this.onUserSelect}
          startDateUsernameFilter={this.state.startDate}
          endDateUsernameFilter={this.state.endDate}
          onSearchUsernameFilter={this.onSearchByDate}
          onStartDateUsernameFilter={this.onStartDateChange}
          onEndDateUsernameFilter={this.onEndDateChange}
          onSearchFinalUsernameFilter={this.onSearchByTimeAndUser}
        />
        <Table
          data={this.state.posts}
          columns={columns}
          page={this.state.page}
          count={this.state.count}
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

const PostsTablePage = withRouter(
  connect(
    mapStateToProps,
    { fetchPosts, postDelete, postByTime, fetchUsers, postByTimeAndUsers }
  )(PostsTable)
);

export default PostsTablePage;
