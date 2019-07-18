import React, { useState, useEffect } from "react";
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
import { search, contentLoading, error } from "../actions/fetchData";

// components
import { Card } from "../components/Card";
// import Loading from "../components/Loading";
import Spinner from "../components/Spinner";
import { UploadInput } from "../reusableComponents/UploadInput";

// Capability file for this component
// import { SearchInputCapabilities } from "./SearchInputCapabilities";
//const accessibility = <SearchInputCapabilities role={props.user.role} />;

function SearchInputCapabilities(role) {
  switch (role) {
    case "SUPER_ADMINISTRATOR":
      return true;
    case "ADMINISTRATOR":
      return true;
    case "EDITOR":
      return true;
    case "AUTHOR":
      return true;
    case "CONTRIBUTOR":
      return false;
    case "SUBSCRIBER":
      return false;
    default:
      return false;
  }
}

const options = [
  { value: "text", label: <FontAwesomeIcon icon={faFileAlt} /> },
  { value: "image", label: <FontAwesomeIcon icon={faCamera} /> },
  { value: "video", label: <FontAwesomeIcon icon={faVideo} /> }
];

function SearchInput(props) {
  const accessibility = SearchInputCapabilities(props.user.role);
  console.log("accessibility ", accessibility);

  const [selectedOption, setSelectedOption] = useState("text");
  const [content_type, setContent_type] = useState([]);

  const handleChange = e => {
    setSelectedOption(e.value);
  };

  const onSearch = e => {
    e.preventDefault();
    props.contentLoading();
    setTimeout(() => props.search(), 3000);
    contentLoading();
  };

  const displayResults = cards => {
    return cards.map(card => (
      <Card
        key={card.id}
        card={card}
        display={content_type.includes(card.type)}
      />
    ));
  };

  // useEffect(() => {
  //   console.log("fired");
  //   // return displayResults(props.fetch.data);
  // }, [content_type]);

  const checkboxToggle = e => {
    const new_list = content_type;
    if (new_list.includes(e)) {
      new_list.splice(new_list.indexOf(e), 1);
    } else {
      new_list.push(e);
    }
    setContent_type(new_list);
  };

  if (true) {
    return (
      <div>
        <div className="container search-box">
          <form className="search-form">
            <div className="form-inline">
              <Select
                className="mr-2"
                placeholder={<FontAwesomeIcon icon={faFileAlt} />}
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
              {selectedOption === "text" ? (
                <div className="search-content">
                  <input
                    className="form-control mr-2"
                    type="text"
                    id="search-input"
                    placeholder="Search"
                  />
                </div>
              ) : selectedOption === "image" ? (
                <div className="search-content">
                  <UploadInput label="Upload Image" />
                </div>
              ) : (
                <div className="search-content">
                  <UploadInput label="Upload Video" />
                </div>
              )}
              <button
                className="btn search-btn ml-2"
                type="button"
                onClick={onSearch}
              >
                <FontAwesomeIcon icon={faSearch} color="#fff" />
              </button>
            </div>
            <div className="form-inline mt-3">
              <label className="checkbox-box">
                text
                <input type="checkbox" onClick={() => checkboxToggle("text")} />
                <span className="checkmark" />
              </label>
              <label className="checkbox-box">
                image
                <input
                  type="checkbox"
                  onClick={() => checkboxToggle("image")}
                />
                <span className="checkmark" />
              </label>
              <label className="checkbox-box">
                video
                <input
                  type="checkbox"
                  onClick={() => checkboxToggle("video")}
                />
                <span className="checkmark" />
              </label>
            </div>
          </form>
        </div>
        <div className="search-result container mt-5">
          {/* empty cards for loading */}
          {/* {props.fetch.loading ? <Loading /> : null} */}
          {/* spinner for loading */}
          {props.fetch.loading ? <Spinner /> : null}
          <div className="card-columns">{displayResults([props.fetch])}</div>
        </div>
      </div>
    );
  } else {
    props.error("Permission denied");
    return null;
  }
}

SearchInput.propTypes = {
  data: PropTypes.array,
  search: PropTypes.func.isRequired,
  contentLoading: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  fetch: state.fetch,
  user: state.user
});

export default connect(
  mapStateToProps,
  { search, contentLoading, error }
)(SearchInput);
