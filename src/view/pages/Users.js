import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { textFilter } from 'react-bootstrap-table2-filter';
import { Redirect } from 'react-router-dom';
//actions
import { userDelete, selectedUser, fetchUsers } from '../../redux/actions/user';

//components
import BreadCrumb from '../atomic-components/BreadCrumb';
import Table from '../atomic-components/Table';
import PrimaryActionUser from '../components/PrimaryActionUserTable';

// action control
import AccessControl from '../components/AccessControl';

// socket io
import io from 'socket.io-client';

import {SOCKET_URL} from '../../service/shell-server'

//connect to server
const socket = io(`${SOCKET_URL}`);

class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      page: 1,
      count: 0,
      loading: true
    };

    this.refresh = this.refresh.bind(this);
    this.actionIconsFormatter = this.actionIconsFormatter.bind(this);
  }

  actionIconsFormatter(cell, row, rowIndex, props) {
    return (
      <div>
        <AccessControl
          allowedPermissions={['user:canDelete']}
          text={() => this.dothis()}
          renderNoAccess={() => {}}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            className='mr-2'
            onClick={() => {
              props.userDelete(row.id, this.state.page);
              // this.refresh();
            }}
          />
        </AccessControl>
        <AccessControl
          allowedPermissions={['user:canView']}
          renderNoAccess={() => {}}
        >
          <FontAwesomeIcon
            icon={faEdit}
            className='mr-2'
            onClick={() => {
              props.selectedUser(row);
              props.history.push(`/users/update/${row.id}`);
            }}
          />
        </AccessControl>
        <FontAwesomeIcon icon={faCheck} />
      </div>
    );
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    let page = path.split('/users/page/')[1];
    if (page === '') {
      page = 1;
    }

    this.props.fetchUsers(page);

    // SOCKET IO
    // so when new data is received the page will refresh automatically.
    socket.on('posts/newData', value => {
      this.refresh();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.props.users) {
      this.setState({
        users: nextProps.users.users,
        page: nextProps.users.page,
        count: nextProps.users.count
      });
    }
  }
  refresh() {
    this.props.fetchUsers(this.state.page);
  }

  //TODO : change this life cycle method.

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.fetch) {
  //     return {
  //       data: nextProps.fetch.data,
  //       loading: nextProps.fetch.loading
  //     };
  //   }
  //   else return null;
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevProps.fetch !== )
  // // }

  render() {
    if (this.props.location.pathname === '/users') {
      return <Redirect to='/users/page/1' />;
    }

    const columns = [
      {
        dataField: 'username',
        text: 'Username'
      },
      {
        dataField: 'email',
        text: 'Email',
        formatter: this.previewFormatter
      },
      {
        dataField: 'role',
        text: 'Role',
        filter: textFilter(),
        headerAlign: 'center'
      },
      {
        dataField: 'posts',
        text: 'Posts',
        filter: textFilter(),
        headerAlign: 'center'
      },
      {
        dataField: 'actions',
        text: 'Actions',
        formatter: this.actionIconsFormatter,
        formatExtraData: this.props
      }
    ];

    return (
      <div className='container'>
        <BreadCrumb
          path={this.props.match.path}
          page={parseInt(this.state.page)}
        />
        <PrimaryActionUser refresh={this.refresh} />
        <Table
          data={this.state.users}
          columns={columns}
          page={parseInt(this.state.page)}
          count={this.state.count}
        />
      </div>
    );
  }
}

UsersTable.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  userDelete: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

const UsersTablePage = withRouter(
  connect(
    mapStateToProps,
    { fetchUsers, userDelete, selectedUser }
  )(UsersTable)
);

export default UsersTablePage;
