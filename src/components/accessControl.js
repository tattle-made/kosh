import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import getUserPermissions from "../utils/permission";



class AccessControl extends Component {

    getUserPermissions(role) {
        switch(role){
            case "ADMIN":
              return ["post:canDelete","post:canUpload", "user:canView"];
            case "SUBSCRIBER":
             return [];
            default:
            return [];
        }
    }
    checkPermissions(userPermissions,  allowedPermissions) {
      //return true only if userPermissions have all the permission of the
      // component.
      return  allowedPermissions.every(permission => userPermissions.includes(permission));

      // returns true even if user have some permission of the component.

        // if ( allowedPermissionsPermissions.length === 0) {
        //     return true;
        //   }

        //     return userPermissions.some(permission =>
        //       allowedPermissions.includes(permission)
        //   );
    }

 
  render() {

const userPermissions = this.getUserPermissions(this.props.userRole);

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

AccessControl.ropTypes = {
  allowedPermissions: PropTypes.array,
  renderNoAccess: PropTypes.func,
};

const mapStateToProps = state => ({
    userRole : state.user.role
});

export default connect(mapStateToProps,{})(AccessControl);
