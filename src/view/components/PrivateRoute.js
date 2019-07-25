import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../atomic-components/Spinner";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? (
          auth.isAuthorized === true ? (
            <Component {...props} />
          ) : (
            // <component />
            <Spinner />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const PrivateRouteItem = connect(mapStateToProps)(PrivateRoute);

export default PrivateRouteItem;
