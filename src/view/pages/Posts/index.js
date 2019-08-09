import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

//actions
import { fetchPosts } from '../../../redux/actions/post';
import {
  postDelete,
  postByTime,
  postByTimeAndUsers
} from '../../../redux/actions/post';

//components
import BreadCrumb from '../../atomic-components/BreadCrumb';
import Table from '../../atomic-components/Table';
import PrimaryActionTable from '../../components/PrimaryActionPostTable';
import columnFactory from './column-data';
import SearchPostFilterParameters from '../../components/SearchPostFilterParameters';

import { onSearch } from './post-controller';

// socket io
import io from 'socket.io-client';

//connect to server
const socket = io('http://localhost:8080/');

class PostsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 1,
      count: 0,
      loading: true,
      filter: ''
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    let page = path.split('/posts/')[1];
    if (page === '') {
      page = 1;
    }

    setTimeout(() => {
      this.props.fetchPosts(page);
    }, 1000);

    // SOCKET IO
    // so when new data is received the page will refresh automatically.
    socket.on('posts/newData', value => {
      this.refresh();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      this.setState({
        posts: nextProps.posts.posts,
        page: nextProps.posts.page,
        count: nextProps.posts.count
      });
    }
  }

  refresh() {
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

  onSearch(data) {
    onSearch(data, this.state.filter, this.props);
  }

  onFilterItemSelect(filter) {
    this.setState({
      filter
    });
  }

  render() {
    if (this.props.location.pathname === '/posts') {
      return <Redirect to='/posts/1' />;
    }

    const columns = columnFactory(
      [this.props, this.state.page],
      this.props.history
    );

    return (
      <div className='container'>
        <BreadCrumb
          path={this.props.match.path}
          page={parseInt(this.state.page)}
        />
        <PrimaryActionTable
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
          page={parseInt(this.state.page)}
          count={this.state.count}
        />
      </div>
    );
  }
}

PostsTable.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

const PostsTablePage = withRouter(
  connect(
    mapStateToProps,
    { fetchPosts, postByTime, postByTimeAndUsers, postDelete }
  )(PostsTable)
);

export default PostsTablePage;
