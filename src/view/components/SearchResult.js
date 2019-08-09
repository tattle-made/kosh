import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Spinner from "../atomic-components/Spinner";
import Card from '../components/Card';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      this.setState({
        search: nextProps.search
      });
    }
  }
  displayResults(cards) {
    console.log('cards ', cards);
    return cards.map(card => (
      <Card
        key={card.id}
        card={card}
        display={this.props.content_type.includes(card.type)}
      />
    ));
  }
  render() {
    return (
      <div className='search-result container mt-5'>
        <div className='card-columns'>
          {this.displayResults(this.state.search)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search
});

const Search = connect(
  mapStateToProps,
  {}
)(SearchResult);

export default Search;
