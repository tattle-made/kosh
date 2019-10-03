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

import {Container} from 'react-bootstrap'

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content_type: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault()
    console.log(event)

    // this.setState({
    //   content_type: query.content_type
    // });
    // // query to pass in search
    // // when search in backend is functional
    this.props.triggerLoading(true);
    this.props.search();
  }

  render() {
    return (
      <Container>
        <BreadCrumb path={this.props.match.path} />
        <SearchForm onFormSubmit={this.onSubmit} />
        <SearchResult
          data={this.state.data}
          content_type={this.state.content_type}
        />
      </Container>
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
