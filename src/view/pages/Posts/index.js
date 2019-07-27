import React, { Component } from "react";
import {
  faUpload,
  faDownload,
  faSync,
  faSearch,
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

//actions
import { fetchPosts } from "../../../redux/actions/post";
import { triggerRefresh } from "../../../redux/actions/utils";
import {
  postDelete,
  postByTime,
  postByTimeAndUsers
} from "../../../redux/actions/post";

//components
import HeadingTwo from "../../atomic-components/text/HeadingTwo";
import Table from "../../atomic-components/Table";
import PrimaryActionTable from "../../components/PrimaryActionPostTable";
import columnFactory from "./column-data";
import SearchPostFilterParameters from "../../components/SearchPostFilterParameters";

import {
  onSearch,
  onSearchByDate,
  onSearchByTimeAndUser,
  refresh
} from "./post-controller";

// socket io
import io from "socket.io-client";

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
      refresh: false,
      filter: ""
    };
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
    setTimeout(() => {
      this.props.fetchPosts(page);
    }, 1000);

    // SOCKET IO
    // so when new data is received the page will refresh automatically.
    socket.on("posts/newData", value => {
      console.log("new Data received", value.name);
      triggerRefresh(54454);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("will recieve new props", nextProps);
    if (nextProps.posts !== this.props.posts) {
      this.setState({
        posts: nextProps.posts.posts,
        page: nextProps.posts.page,
        // totalPages: nextProps.posts.totalPages,
        count: nextProps.posts.count
      });
    }

    // if (nextProps.refresh !== this.props.refresh) {
    //   // this.setState({
    //   //   refresh: nextProps.refresh
    //   // });
    //   console.log("ander hai bhia refresh props");
    //   this.props.fetchPosts(this.state.page);
    //   // refresh(this.state.page);
    // }
    if (nextProps.refresh !== this.props.refresh) {
      this.setState({
        refresh: nextProps.refresh
      });
      console.log("refreshing");
      this.refresh();
    }
  }

  refresh() {
    console.log("refreshing");
    this.props.fetchPosts();
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

  onSearch(data) {
    onSearch(data, this.state.filter, this.props);
  }

  onFilterItemSelect(filter) {
    this.setState({
      filter
    });
  }

  render() {
    if (this.props.location.pathname === "/posts") {
      return <Redirect to="/posts/1" />;
    }
    console.log("page ", this.state.page);

    // // SOCKET IO
    // // so when new data is received the page will refresh automatically.
    // socket.on("posts/newData", value => {
    //   console.log("new Data received", value.name);
    //   refresh(this.state.page);
    // });

    const columns = columnFactory(
      [this.props, this.state.page],
      this.props.history
    );

    return (
      <div className="container">
        <HeadingTwo text="Posts" />
        <PrimaryActionTable
          faUpload={eval(faUpload)}
          faDownload={eval(faDownload)}
          faFilter={eval(faFilter)}
          faSync={eval(faSync)}
          refresh={triggerRefresh(9098)}
          filter={filterType => this.onFilterItemSelect(filterType)}
        />
        <SearchPostFilterParameters
          type={this.state.filter}
          payload={data =>
            this.onSearch(data, this.state.filter, this.props.location)
          }
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
  posts: state.posts,
  refresh: state.refresh
});

const PostsTablePage = withRouter(
  connect(
    mapStateToProps,
    { fetchPosts, postByTime, postByTimeAndUsers, postDelete, triggerRefresh }
  )(PostsTable)
);

export default PostsTablePage;
