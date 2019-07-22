import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faUsers,
  faSearch,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { withRouter, Redirect } from "react-router-dom";
import tattle_monogram_dark from "../img/tattle_monogram_dark.png";

//components
import SearchInput from "./SearchInput";
import PostsTable from "./PostsTable";
import UsersTable from "./UsersTable";
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";
import PostsTableItem from "./PostsTableItem";
import MenuItem from "../reusableComponents/MenuItem";
import tattle1 from "../img/tattle1.svg";

// access control
import AccessControl from "./accessControl";

class SideNav extends Component {
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
    console.log("toggle");
    this.setState({
      open: !this.state.open
    });
  }

  onMenuItemClick(e) {
    console.log("menuItem");
    e.stopPropagation();
  }

  mainContent(route) {
    if (route === "/posts" || route.includes("/posts/")) {
      return <PostsTable />;
    } else if (route === "/search") {
      return <SearchInput />;
    } else if (route === "/users") {
      return <UsersTable />;
    } else if (route === "/users/create") {
      return <UserCreate />;
    } else if (route.includes("/users/update")) {
      return <UserUpdate />;
    } else {
      return <PostsTableItem />;
    }
  }
  render() {
    console.log("sidenav route", this.props.location.pathname);
    return (
      <div
        className={classnames("main", {
          "sidenav-open": this.state.open,
          "sidenav-close": !this.state.open
        })}
      >
        <div className="content-container">
          <div className="sidenav-container" onClick={() => this.toggle()}>
            <div>
              <div className="app-logo-container">
                <img className="logo" src={tattle_monogram_dark} alt="logo" />
                <h1>Tattle</h1>
                <span
                  className="sideNav-cross"
                  onClick={() => this.closeSideNav()}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              <div className="links" onClick={e => this.onMenuItemClick(e)}>
                <MenuItem
                  route={"/posts"}
                  icon={eval(faCloud)}
                  label={"Posts"}
                  className={classnames({
                    active:
                      this.props.location.pathname.includes("/posts") ||
                      this.props.location.pathname.includes("/post")
                  })}
                />
                <MenuItem
                  route={"/search"}
                  icon={eval(faSearch)}
                  label={"Search"}
                  className={classnames({
                    active: this.props.location.pathname.includes("/search")
                  })}
                />
                <AccessControl
                  allowedPermissions={["user:canView"]}
                  text={() => this.dothis()}
                  renderNoAccess={() => console.log("u dont have permission")}
                >
                  <MenuItem
                    route={"/users"}
                    icon={eval(faUsers)}
                    label={"Users"}
                    className={classnames({
                      active: this.props.location.pathname.includes("/users")
                    })}
                  />
                </AccessControl>
              </div>
            </div>
          </div>

          <div className="main-content-container">
            {this.mainContent(this.props.location.pathname)}
          </div>
        </div>
      </div>
    );
  }
}

const SideNavBar = withRouter(SideNav);

export default SideNavBar;
