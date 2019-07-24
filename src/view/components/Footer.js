import React, { Component } from "react";
import Footer from "../atomic-components/Footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IsEmpty from "is-empty";

class FooterSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== this.props.error) {
      this.setState({
        error: nextProps.error,
        visible: true
      });
    }
  }

  render() {
    const { error } = this.state;
    // console.log(this.props.error.message);
    console.log(error);
    console.log("visible ", this.state.visible);
    if (!IsEmpty(error)) {
      console.log("error hai FOOTER ", error);
      return (
        <Footer
          alert_type=""
          message={error.message}
          visible={this.state.visible}
          closeFooter={() => {
            console.log("close");
            this.setState({
              error: ""
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
  error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  error: state.error
});

const FooterBottom = connect(
  mapStateToProps,
  {}
)(FooterSite);

export default FooterBottom;
