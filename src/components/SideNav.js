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
import PostsTableItem from "./PostsTableItem";
// access control
import AccessControl from "./accessControl"

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
  mainContent(route) {
    if (route === "/posts") {
      return <PostsTable />;
    } else if (route === "/search") {
      return <SearchInput />;
    } else if (route === "/users") {
      return <Users />;
    } else {
      return <PostsTableItem />;
    }
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
                  <FontAwesomeIcon icon={faCloud} color="#000637" />
                </span>
                <h2>Posts</h2>
              </div>
            </Link>
            <Link to="/search">
              <div className="label-icon-container">
                <span className="icon">
                  <FontAwesomeIcon icon={faSearch} color="#000637" />
                </span>
                <h2>Search</h2>
              </div>
            </Link>
            <AccessControl userPermissions={["read"]}
              allowedPermissions={["user:canView"]} text={() => this.dothis()} 
               renderNoAccess = {() => console.log("u dont have permission")}
            >
              <Link to="/users">
                 <div className="label-icon-container">
                  <span className="icon">
                  <FontAwesomeIcon icon={faUsers} color="#000637" />
                  </span>
                 <h2>Users</h2>
                  </div>
              </Link>
            </AccessControl>
            
          </div>

          <div className="main-content-container">
            {this.mainContent(this.props.location.pathname)}
          </div>
        </div>
      </div>
    );
  }
}
