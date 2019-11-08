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
import SimpleSearchResult from '../components/TempImageCard'

import {Container} from 'react-bootstrap'

import {Layout} from '@tattle-made/ui'
import SectionSearch from '../sections/SectionSearchWhatsappPosts'

const {SimpleLayout} = Layout;

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content_type: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault()
    console.log(this.state)

    // this.setState({
    //   content_type: query.content_type
    // });
    // // query to pass in search
    // // when search in backend is functional
    this.props.triggerLoading(true);
    this.props.search({
      search_term: this.state.search_term, 
      image_url: this.state.image_url
    });
  }
  
  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    console.log('==test==', typeof(this.props.searchResult))
    return (
      <Container>
        <SimpleLayout>
          <SectionSearch/>
        </SimpleLayout>
      </Container>
    );
  }
}

SearchInput.propTypes = {
  triggerLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.loading,
  searchResult: state.search
});

const Search = withRouter(
  connect(
    mapStateToProps,
    { search, triggerLoading }
  )(SearchInput)
);

export default Search;
