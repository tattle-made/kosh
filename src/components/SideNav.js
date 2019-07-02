import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faUsers,
  faSearch,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { Link } from "react-router-dom";

//components
import SearchInput from "./SearchInput";
import PostsTable from "./PostsTable";
import Users from "./Users";

export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  closeSideNav(e) {
    console.log("hi this is");
  }
  toggle(e) {
    this.setState({
      open: !this.state.open
    });
  }
  render() {
    return (
      <div
        className={classnames("main", {
          "sidenav-open": this.state.open,
          "sidenav-close": !this.state.open
        })}
      >
        <div className="content-container">
          <div className="sidenav-container" onClick={this.toggle.bind(this)}>
            <div className="app-logo-container">
              <img
                className="logo"
                src="http://blog.tattle.co.in/content/images/2019/06/xmonogram.png.pagespeed.ic.W0h-PgH2Ps.webp"
              />
              <h1>Tattle</h1>
              <span
                className="sideNav-cross"
                onClick={this.closeSideNav.bind(this)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>

            <Link to="/posts">
              <div className="label-icon-container">
                <span className="icon">
                  <FontAwesomeIcon icon={faCloud} />
                </span>
                <h2>Posts</h2>
              </div>
            </Link>
            <Link to="/search">
              <div className="label-icon-container">
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <h2>Search</h2>
              </div>
            </Link>
            <Link to="/users">
              <div className="label-icon-container">
                <span className="icon">
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                <h2>Users</h2>
              </div>
            </Link>
          </div>

          <div className="main-content-container">
            {this.props.location.pathname === "/posts" ? (
              <PostsTable />
            ) : this.props.location.pathname === "/search" ? (
              <SearchInput />
            ) : this.props.location.pathname === "/users" ? (
              <Users />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
