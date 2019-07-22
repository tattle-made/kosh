import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getUserPermissions from "../utils/permissions";

class AccessControl extends Component {
  checkPermissions(userPermissions, allowedPermissions) {
    //return true only if userPermissions have all the permission of the
    // component.
    return allowedPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    // returns true even if user have some permission of the component.

    // if ( allowedPermissionsPermissions.length === 0) {
    //     return true;
    //   }
    //     return userPermissions.some(permission =>
    //       allowedPermissions.includes(permission)
    //   );
  }

  render() {
    const userPermissions = getUserPermissions(this.props.userRole);

    const permitted = this.checkPermissions(
      userPermissions,
      this.props.allowedPermissions
    );

    if (permitted) {
      return this.props.children;
    }
    this.props.renderNoAccess();
    return null;
  }
}

AccessControl.propTypes = {
  allowedPermissions: PropTypes.array,
  renderNoAccess: PropTypes.func
};

const mapStateToProps = state => ({
  userRole: state.user.role
});

const AccessControlWithRedux = connect(
  mapStateToProps,
  {}
)(AccessControl);

export default AccessControlWithRedux;
