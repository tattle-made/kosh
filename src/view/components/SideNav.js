import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faUsers,
  faSearch,
  faTimes,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import tattle_monogram_dark from '../../assets/img/tattle_monogram_dark.png';

//components
import SearchInput from '../pages/Search';
import PostsTable from '../pages/Posts';
import UsersTable from '../pages/Users';
import UserCreate from '../pages/UserCreate';
import UserUpdate from '../pages/UserUpdate';
import PostsTableItem from './PostData';
import MenuItem from '../atomic-components/MenuItem';

//action
import { logoutUser } from '../../redux/actions/auth';

// access control
import AccessControl from './AccessControl';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onUserOptionClick = this.onUserOptionClick.bind(this);
  }
  closeSideNav(e) {
    console.log('hi this is');
  }

  toggle(e) {
    console.log('toggle');
    this.setState({
      open: !this.state.open
    });
  }

  onMenuItemClick(e) {
    console.log('menuItem');
    e.stopPropagation();
  }

  onUserOptionClick(e) {
    console.log('user options');
    this.props.logoutUser();
    e.stopPropagation();
  }

  mainContent(route) {
    if (route === '/posts' || route.includes('/posts/')) {
      return <PostsTable />;
    } else if (route === '/search') {
      return <SearchInput />;
    } else if (route === '/users/create') {
      return <UserCreate />;
    } else if (route.includes('/users/update')) {
      return <UserUpdate />;
    } else if (
      route === '/users' ||
      route === '/users/page' ||
      route.includes('/users/page/')
    ) {
      return <UsersTable />;
    } else {
      return <PostsTableItem />;
    }
  }

  render() {
    console.log('sidenav route', this.props.location.pathname);
    return (
      <div
        className={classnames('main', {
          'sidenav-open': this.state.open,
          'sidenav-close': !this.state.open
        })}
      >
        <div className='content-container'>
          <div className='sidenav-container' onClick={() => this.toggle()}>
            <div>
              <div className='app-logo-container'>
                <img className='logo' src={tattle_monogram_dark} alt='logo' />
                <h1>Tattle</h1>
                <span
                  className='sideNav-cross'
                  onClick={() => this.closeSideNav()}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              <div className='links' onClick={e => this.onMenuItemClick(e)}>
                <MenuItem
                  route={'/posts'}
                  icon={eval(faCloud)}
                  label={'Posts'}
                  className={classnames({
                    active:
                      this.props.location.pathname.includes('/posts') ||
                      this.props.location.pathname.includes('/post')
                  })}
                />
                <MenuItem
                  route={'/search'}
                  icon={eval(faSearch)}
                  label={'Search'}
                  className={classnames({
                    active: this.props.location.pathname.includes('/search')
                  })}
                />
                <AccessControl
                  allowedPermissions={['user:canView']}
                  text={() => this.dothis()}
                  renderNoAccess={() => console.log('u dont have permission')}
                >
                  <MenuItem
                    route={'/users'}
                    icon={eval(faUsers)}
                    label={'Users'}
                    className={classnames({
                      active: this.props.location.pathname.includes('/users')
                    })}
                  />
                </AccessControl>
              </div>
              <div
                onClick={e => this.onUserOptionClick(e)}
                className='user-options'
              >
                <FontAwesomeIcon icon={faSignOutAlt} size='lg' />
              </div>
            </div>
          </div>

          <div className='main-content-container'>
            {this.mainContent(this.props.location.pathname)}
          </div>
        </div>
      </div>
    );
  }
}

const SideNavBar = withRouter(
  connect(
    null,
    { logoutUser }
  )(SideNav)
);

export default SideNavBar;
