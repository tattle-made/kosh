import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import HeadingTwo from '../atomic-components/text/HeadingTwo';
import itemList from '../../core-utils/breadcrumbItems';

class BreadCrumb extends Component {
  constructor(props) {
    super(props);
  }

  display(items) {
    let link = '';
    return items.map(item => {
      link += `/${item}`;
      return (
        <Breadcrumb.Item href={link} key={item}>
          <HeadingTwo text={item} />
        </Breadcrumb.Item>
      );
    });
  }
  render() {
    const items = itemList(this.props.path);

    return (
      <div>
        <Breadcrumb>{this.display(items)}</Breadcrumb>
      </div>
    );
  }
}

const BreadCrumbItem = withRouter(BreadCrumb);

export default BreadCrumbItem;
