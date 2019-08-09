import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { triggerLoading } from '../../redux/actions/utils';
import { search } from '../../redux/actions/post';

import BreadCrumb from '../atomic-components/BreadCrumb';
import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      content_type: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetch) {
      this.setState({
        data: nextProps.fetch.data,
        loading: nextProps.fetch.loading
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
  //   if(prevProps.)
  // }

  onSubmit(query) {
    console.log('submit', query);
    this.setState({
      content_type: query.content_type
    });
    // query to pass in search
    // when search in backend is functional
    this.props.triggerLoading(true);
    this.props.search();
  }

  render() {
    return (
      <div className='container'>
        <BreadCrumb path={this.props.match.path} />
        <SearchForm onFormSubmit={query => this.onSubmit(query)} />
        <SearchResult
          data={this.state.data}
          content_type={this.state.content_type}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  search: PropTypes.func.isRequired,
  triggerLoading: PropTypes.func.isRequired
};

const Search = withRouter(
  connect(
    null,
    { search, triggerLoading }
  )(SearchInput)
);

export default Search;
