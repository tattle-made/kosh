import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateFilter from '../atomic-components/DateFilter';
import UsernameFilter from '../atomic-components/UsernameFilter';

import { fetchAllUsers } from '../../redux/actions/user';

class SearchPostFilterParameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: []
    };
    this.onUserSelect = this.onUserSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.props.users) {
      const users = [];
      nextProps.users.forEach(user => {
        users.push({ label: user.username, value: user.id });
      });
      this.setState({
        users
      });
    }
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  onSearch(data) {
    const { type } = this.props;

    if (type === 'date') {
      this.props.payload(data);
    } else if (type === 'name') {
      this.props.payload({
        username: this.state.selectedUsers,
        from: data.from,
        to: data.to
      });
    }
  }

  onUserSelect(selectedUsers) {
    this.setState({
      selectedUsers
    });
  }

  render() {
    return (
      <div>
        {this.props.type === 'date' ? (
          <DateFilter time={data => this.onSearch(data)} />
        ) : this.props.type === 'name' ? (
          <UsernameFilter
            users={this.state.users}
            selectedUsers={this.state.selectedUsers}
            onUserSelect={this.onUserSelect}
            time={data => this.onSearch(data)}
          />
        ) : null}
      </div>
    );
  }
}

SearchPostFilterParameters.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  payload: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  users: PropTypes.array
};

const mapStateToProps = state => ({
  users: state.allUsers.users
});

const SearchPostFilter = connect(
  mapStateToProps,
  { fetchAllUsers }
)(SearchPostFilterParameters);
export default SearchPostFilter;
