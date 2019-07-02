import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

// Components
import SearchInput from "./SearchInput";
import ScraperPage from "./ScraperPage";
import CrowdsourcePage from "./CrowdsourcePage";
import PostsTable from "./PostsTable";
import { SidebarRandomText } from "./SidebarRandomText";

//actions
import { breadcrumbsAdd } from "../actions/breadcrumbs";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleClass: false,
      content: "text"
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      toggleClass: !this.state.toggleClass
    });
  }

  sidebarItemSelect(selectedItem) {
    this.setState({
      content: selectedItem
    });
    this.props.history.push("/posts");
    this.props.breadcrumbsAdd(selectedItem);
  }

  contentDisplay(content) {
    if (content === "search") {
      return <SearchInput />;
    } else if (content === "scraper") {
      return <ScraperPage />;
    } else if (content === "crowdsource") {
      return <CrowdsourcePage />;
    } else if (content === "posts") {
      return <PostsTable />;
    } else {
      return <SidebarRandomText />;
    }
  }
  render() {
    const { toggleClass } = this.state;
    return (
      <div>
        <div id={toggleClass ? "sidebar-wrapper-toggle" : "sidebar-wrapper"}>
          <ul className="list-group">
            <div className="hamburger-cancel d-flex">
              <button className="btn ml-auto" onClick={this.toggle}>
                <FontAwesomeIcon icon={faTimes} color="#ea6565" />
              </button>
            </div>
            <li
              className="list-group-item"
              onClick={() => this.sidebarItemSelect("search")}
            >
              <a href="#">Search</a>
            </li>
            <li
              className="list-group-item"
              onClick={() => this.sidebarItemSelect("scraper")}
            >
              <a href="#">Scraper</a>
            </li>
            <li
              className="list-group-item"
              onClick={() => this.sidebarItemSelect("crowdsource")}
            >
              <a href="#">Crowdsource</a>
            </li>
            <li
              className="list-group-item"
              onClick={() => this.sidebarItemSelect("posts")}
            >
              <a href="#">Posts</a>
            </li>
          </ul>
        </div>

        <div
          id={
            toggleClass ? "page-content-wrapper-toggle" : "page-content-wrapper"
          }
        >
          <div className={toggleClass ? "hamburger-hide" : ""}>
            <button className="btn" onClick={this.toggle}>
              <FontAwesomeIcon icon={faBars} color="#ea6565" />
            </button>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {this.contentDisplay(this.state.content)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  breadcrumbsAdd: PropTypes.func.isRequired
};

export default connect(
  null,
  { breadcrumbsAdd }
)(Sidebar);
