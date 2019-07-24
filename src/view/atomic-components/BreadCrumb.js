import React, { Component } from "react";
import { Breadcrumb } from "react-bootstrap";
import HeadingTwo from "../atomic-components/text/HeadingTwo";

class BreadCrumb extends Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/users">
            <span>
              <HeadingTwo text="Users" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users/create">
            <HeadingTwo text="Create" />
          </Breadcrumb.Item>
          {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
        </Breadcrumb>
      </div>
    );
  }
}

export default BreadCrumb;
