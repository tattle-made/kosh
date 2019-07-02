import React, { Component } from "react";
import { Footer } from "../reusableComponents/Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IsEmpty from "is-empty";

class FooterSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "Server Down",
      visible: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;

    if (!IsEmpty(errors)) {
      return (
        <Footer
          alert_type="danger"
          message={errors}
          visible={this.state.visible}
          closeFooter={() => {
            this.setState({
              visible: false
            });
          }}
        />
      );
    } else {
      return null;
    }
  }
}

FooterSite.prototypes = {
  errors: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(FooterSite);
