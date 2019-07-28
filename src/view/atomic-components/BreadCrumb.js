import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import HeadingTwo from "../atomic-components/text/HeadingTwo";
import itemList from "../../core-utils/breadcrumbItems";

class BreadCrumb extends Component {
  constructor(props) {
    super(props);
  }

  display(items) {
    return items.map(item => {
      return (
        <Breadcrumb.Item href={this.props.location.path} key={item}>
          <HeadingTwo text={item} />
        </Breadcrumb.Item>
      );
    });
  }
  render() {
    // console.log("breadcrumb ", this.props);
    const items = itemList(this.props.path);
    // console.log("items", items);

    return (
      <div>
        <Breadcrumb>{this.display(items)}</Breadcrumb>
      </div>
    );
  }
}

const BreadCrumbItem = withRouter(BreadCrumb);

export default BreadCrumbItem;
