import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFileAlt,
  faCamera,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// actions
import { search, contentLoading } from "../actions/fetchData";

// components
import { Card } from "../components/Card";
import Loading from "../components/Loading";
import Spinner from "../components/Spinner";

const options = [
  { value: "text", label: <FontAwesomeIcon icon={faFileAlt} /> },
  { value: "image", label: <FontAwesomeIcon icon={faCamera} /> },
  { value: "video", label: <FontAwesomeIcon icon={faVideo} /> }
];

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      loading: false,
      data: [],
      selectedOption: "text",
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
    return cards.map(card => (
      <Card
        key={card.id}
        card={card}
        display={this.state.content_type.includes(card.type)}
      />
    ));
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

  // inputvalue(e) {
  //   console.log("INPUT ", e.target.value);
  // }
  onInputChange(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.contentLoading();
    console.log("search ", this.state.searchInput);
    this.props.contentLoading();
    const url = `http://13.233.110.23:8080/search?type=${
      this.state.content_type
    }&query=${this.state.searchInput}`;
    console.log(url);
    this.props.search(url);
    // this.setState({
    //   loading: false
    // });
  }

  render() {
    const { selectedOption, data } = this.state;
    return (
      <div>
        <div className="container search-box">
          <form className="search-form" onSubmit={this.onFormSubmit.bind(this)}>
            <div className="form-inline">
              <Select
                className="mr-2"
                placeholder={<FontAwesomeIcon icon={faFileAlt} />}
                value={selectedOption}
                onChange={this.handleChange.bind(this)}
                options={options}
              />
              {this.state.selectedOption === "text" ? (
                <div className="search-content">
                  <input
                    className="form-control mr-2"
                    type="text"
                    id="search-input"
                    placeholder="Search"
                    onChange={this.onInputChange.bind(this)}
                  />
                </div>
              ) : this.state.selectedOption === "image" ? (
                <div className="search-content">
                  <div className="custom-file  search-content">
                    <input
                      className="custom-file-input"
                      type="file"
                      id="myfile"
                    />
                    <label
                      className="custom-file-label p-auto"
                      htmlFor="myfile"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>
              ) : (
                <div className="search-content">
                  <div className="custom-file ">
                    <input
                      className="custom-file-input"
                      type="file"
                      id="myfile"
                    />
                    <label className="custom-file-label" htmlFor="myfile">
                      Upload Video
                    </label>
                  </div>
                </div>
              )}
              <button className="btn search-btn ml-2" type="submit">
                <FontAwesomeIcon icon={faSearch} color="#fff" />
              </button>
            </div>
            <div className="form-inline mt-3">
              <label className="checkbox-box">
                text
                <input
                  type="checkbox"
                  onClick={() => this.checkboxToggle("text")}
                />
                <span className="checkmark" />
              </label>
              <label className="checkbox-box">
                image
                <input
                  type="checkbox"
                  onClick={() => this.checkboxToggle("image")}
                />
                <span className="checkmark" />
              </label>
              <label className="checkbox-box">
                video
                <input
                  type="checkbox"
                  onClick={() => this.checkboxToggle("video")}
                />
                <span className="checkmark" />
              </label>
            </div>
          </form>
        </div>
        <div className="search-result container mt-5">
          {/* empty cards for loading */}
          {/* {this.state.loading ? <Loading /> : null} */}
          {/* spinner for loading */}
          {this.props.fetch.loading ? (
            <Spinner />
          ) : (
            <div className="card-columns">{this.displayResults(data)}</div>
          )}
        </div>
      </div>
    );
  }
}

SearchInput.prototypes = {
  data: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
  contentLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fetch: state.fetch
});

export default connect(
  mapStateToProps,
  { search, contentLoading }
)(SearchInput);
