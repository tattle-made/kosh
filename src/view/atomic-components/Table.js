import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

//action
import { fetchPosts } from '../../redux/actions/post';
import { fetchUsers } from '../../redux/actions/user';

class Table extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: [],
    //   page: 1,
    //   count: 0,
    //   columns: []
    // };
  }
  componentWillReceiveProps(nextProps) {
    // console.log("inside table component next props", nextProps);
    if (nextProps.data !== this.props.data) {
      // console.log("inside table component", nextProps.data);
      this.setState({
        data: nextProps.data
      });
    }
    if (nextProps.page !== this.props.page) {
      this.setState({ page: nextProps.page });
    }
    if (nextProps.count !== this.props.count) {
      this.setState({ count: nextProps.count });
    }
    if (nextProps.columns !== this.props.columns) {
      this.setState({ columns: nextProps.columns });
    }
  }

  onPageChange = (page, sizePerPage) => {
    // console.log("inside page table ", page);
    this.setState({
      page
    });

    if (this.props.location.pathname.includes('/posts')) {
      this.props.history.push(`/posts/${page}`);
      this.props.fetchPosts(page);
    } else if (this.props.location.pathname.includes('/users')) {
      this.props.history.push(`/users/page/${page}`);
      this.props.fetchUsers(page);
    } else {
      console.log('check table component');
    }
  };

  render() {
    return (
      <div>
        <BootstrapTable
          striped
          hover
          keyField='id'
          data={this.props.data ? this.props.data : []}
          columns={this.props.columns}
          filter={filterFactory()}
          remote={{ sort: true, pagination: true }}
          pagination={paginationFactory({
            page: parseInt(this.props.page), // Specify the current page. It's necessary when remote is enabled
            sizePerPage: 10, // Specify the size per page. It's necessary when remote is enabled
            totalSize: this.props.count, // Total data size. It's necessary when remote is enabled
            pageStartIndex: 1, // first page will be 0, default is 1
            paginationSize: 5, // the pagination bar size, default is 5
            showTotal: true, // display pagination information
            sizePerPageList: [
              {
                text: '5',
                value: 5
              },
              {
                text: '10',
                value: 10
              },
              {
                text: 'All',
                value: this.props.count
              }
            ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
            withFirstAndLast: false, // hide the going to first and last page button
            alwaysShowAllBtns: true, // always show the next and previous page button
            firstPageText: 'First', // the text of first page button
            prePageText: 'Prev', // the text of previous page button
            nextPageText: 'Next', // the text of next page button
            lastPageText: 'Last', // the text of last page button
            nextPageTitle: 'Go to next', // the title of next page button
            prePageTitle: 'Go to previous', // the title of previous page button
            firstPageTitle: 'Go to first', // the title of first page button
            lastPageTitle: 'Go to last', // the title of last page button
            hideSizePerPage: true, // hide the size per page dropdown
            hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
            onPageChange: this.onPageChange, // callback function when page was changing
            // onSizePerPageChange: (sizePerPage, page) => {}, // callback function when page size was changing
            paginationTotalRenderer: (from, to, size) => {
              return `Showing ${from} to ${to} of ${size} Results`;
            } // custom the pagination total
          })}
          // rowEvents={rowEvents}
          // loading={this.state.loading} //only loading is true, react-bootstrap-table will render overlay
          // overlay={overlayFactory()}
          onTableChange={() => {
            console.log('table change hua hai ,,.s.');
          }}
        />
      </div>
    );
  }
}

const TableData = withRouter(
  connect(
    () => ({}),
    { fetchPosts, fetchUsers }
  )(Table)
);
export default TableData;
