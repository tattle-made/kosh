import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../src/img/logo_logomark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
// List Item can be moved to reusable components
import { ListItem } from "./ListItem";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      breadcrumbs: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.breadcrumbs) {
      this.setState({
        breadcrumbs: nextProps.breadcrumbs
      });
    }
  }

  userPopup() {
    this.setState({
      popup: !this.state.popup
    });
  }

  breadcrumbInHeader() {
    return this.props.breadcrumbs.map(breadcrumb => (
      <ListItem key={breadcrumb} breadcrumb={breadcrumb} />
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img alt="logo" src={logo} />
            </a>
            <ul className="navbar-nav hide">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FontAwesomeIcon icon={faHome} color="#ea6565" /> &raquo;
                </a>
              </li>
              {this.breadcrumbInHeader()}
            </ul>
            <Popup
              on={"hover"}
              trigger={
                <a
                  className="nav-link"
                  onMouseEnter={this.userPopup.bind(this)}
                  onMouseLeave={this.userPopup.bind(this)}
                >
                  <FontAwesomeIcon icon={faUser} color="#ea6565" />
                </a>
              }
              position="bottom right"
            >
              <div>
                <ul className="list-group">
                  <li className="list-group-item">
                    <a href="#">Profile</a>
                  </li>
                  <li className="list-group-item">
                    <a href="#">Logout</a>
                  </li>
                </ul>
              </div>
            </Popup>
          </div>
        </nav>
        <nav className="navbar d-lg-none d-md-none d-sm-none justify-content-center">
          <div className="px-2 nav-link">
            <a>
              <FontAwesomeIcon icon={faHome} color="#ea6565" /> &raquo;
            </a>
          </div>
          <div className="px-2 nav-link">
            <a>Search &raquo;</a>
          </div>
          <div className="px-2 nav-link ">
            <a className="active">abcc</a>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs
});

export default connect(
  mapStateToProps,
  {}
)(Header);
