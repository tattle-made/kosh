import React, { Component } from "react";
import Spinner from "../components/Spinner";

class SearchResult extends Component {
  render() {
    return (
      <div className="search-result container mt-5">
        {/* empty cards for loading
        {/* {this.state.loading ? <Loading /> : null} */}
        {/* spinner for loading */}
        {/* {this.props.fetch.loading ? (
          <Spinner />
        ) : (
          <div className="card-columns">{this.props.displayResults}</div>
        )} */}{" "}
      </div>
    );
  }
}

export default SearchResult;
