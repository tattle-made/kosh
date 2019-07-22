import React, { Component } from "react";
import { Footer } from "../reusableComponents/Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IsEmpty from "is-empty";

class FooterSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors.message,
        visible: true
      });
    }
  }

  render() {
    const { errors } = this.state;
    console.log(this.props.errors.message);
    console.log(errors);
    console.log("visible ", this.state.visible);
    if (errors) {
      return (
        <Footer
          alert_type=""
          message={errors}
          visible={this.state.visible}
          closeFooter={() => {
            console.log("close");
            this.setState({
              errors: ""
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
