import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFileAlt,
  faCamera,
  faVideo,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { search, triggerLoading } from '../../redux/actions/utils';

// components
// // import { Card } from "../components/Card";
// import Loading from "../components/Loading";

import HeadingTwo from '../atomic-components/text/HeadingTwo';
import BodyOne from '../atomic-components/text/BodyOne';
import BreadCrumb from '../atomic-components/BreadCrumb';
import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

const options = [
  { value: 'text', label: <FontAwesomeIcon icon={faFileAlt} /> },
  { value: 'image', label: <FontAwesomeIcon icon={faCamera} /> },
  { value: 'video', label: <FontAwesomeIcon icon={faVideo} /> }
];

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      loading: false,
      data: [],
      selectedOption: 'text',
      content_type: []
    };
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

  handleChange(e) {
    this.setState({ selectedOption: e.value });
  }

  displayResults(cards) {
    // return cards.map(card => (
    //   <Card
    //     key={card.id}
    //     card={card}
    //     display={this.state.content_type.includes(card.type)}
    //   />
    // ));
  }

  checkboxToggle(e) {
    const new_list = this.state.content_type;
    if (new_list.includes(e)) {
      new_list.splice(new_list.indexOf(e), 1);
    } else {
      new_list.push(e);
    }
    this.setState({
      content_type: new_list
    });
  }

  onInputChange(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
  
  }

  render() {

    const { data } = this.state;
    return (
      <div className='container'>
        <BreadCrumb path={this.props.match.path} />
        <SearchForm
          faUpload={eval(faUpload)}
          faSearch={eval(faSearch)}
          onFormSubmit={this.onFormSubmit}
        />
        <SearchResult
          displayResults={this.displayResults(data)}
          checkboxToggle={this.checkboxToggle}
        />
      </div>
    );
  }
}

SearchInput.prototypes = {
  data: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  triggerLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetch: state.fetch
});

const Search = withRouter(
  connect(
    mapStateToProps,
    { search, triggerLoading }
  )(SearchInput)
);

export default Search;
