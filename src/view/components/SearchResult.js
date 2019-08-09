import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Spinner from "../atomic-components/Spinner";
import Card from '../components/Card';
import Spinner from '../atomic-components/Spinner';

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
    if (this.props.content_type.length === 0) {
      return <div>Please select at least one content type and search</div>;
    } else {
      return cards.map(card => (
        <Card
          key={card.id}
          card={card}
          display={this.props.content_type.includes(card.type)}
        />
      ));
    }
  }
  render() {
    return (
      <div className='mt-5'>
        {this.props.loading ? (
          <div className='text-center'>
            <Spinner />
          </div>
        ) : (
          <div className='card-columns '>
            {this.displayResults(this.state.search)}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.search,
  loading: state.loading
});

SearchResult.propTypes = {
  search: PropTypes.array.isRequired,
  content_type: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const Search = connect(
  mapStateToProps,
  {}
)(SearchResult);

export default Search;
