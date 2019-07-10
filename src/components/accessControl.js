import React, { Component } from "react";
import PropTypes from "prop-types";

class AccessControl extends Component {

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

    const permitted = this.checkPermissions(
              this.props.userPermissions,
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
  userPermissions: PropTypes.array,
  renderNoAccess: PropTypes.func,
};


export default AccessControl;
