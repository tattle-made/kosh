import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import {Box, Heading} from 'grommet'
import itemList from '../../core-utils/breadcrumbItems';
import PropTypes from 'prop-types';

class BreadCrumb extends Component {
  display(items) {
    const len = items.length;
    let link = '';
    let display = '';
    items.forEach((item, index) => {
      if (index === len - 1 && this.props.page !== undefined) {
        display = item + this.props.page;
        link += `/${item}/${this.props.page}`;
      } else {
        display = item;
        link += `/${item}`;
      }

      return (items[index] = (
        <Breadcrumb.Item href={link} key={item}>
          <Heading level={3}> {display} </Heading>
        </Breadcrumb.Item>
      ));
    });
    return items;
  }
  render() {
    const items = itemList(this.props.path);

    return (
      <Box>
        <Breadcrumb>{this.display(items)}</Breadcrumb>
      </Box>
    );
  }
}

BreadCrumb.propTypes = {
  path: PropTypes.string.isRequired,
  page: PropTypes.number
};

const BreadCrumbItem = withRouter(BreadCrumb);

export default BreadCrumbItem;
