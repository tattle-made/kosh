import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRoutePermissions } from '../../core-utils/permissions';
import PermissionDenied from './PermissionDenied';

const PrivateRoute = ({ component: Component, auth, userRole, ...rest }) => {
  let authorized = false;
  let allowedRoles = getRoutePermissions(rest.path);

  if (allowedRoles.includes(userRole)) {
    authorized = true;
  }
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? (
          authorized === true ? (
            <Component {...props} />
          ) : (
            <PermissionDenied />
          )
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  userRole: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userRole: state.loginUser.role
});

const PrivateRouteItem = connect(
  mapStateToProps,
  {}
)(PrivateRoute);

export default PrivateRouteItem;
