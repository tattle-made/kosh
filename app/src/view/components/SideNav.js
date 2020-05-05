import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//components
import SearchInput from '../pages/Search';
import PostsTable from '../pages/Posts';
import UsersTable from '../pages/Users';
import UserCreate from '../pages/UserCreate';
import UserUpdate from '../pages/UserUpdate';
import PostsTableItem from './PostData';
import PostMetadata from '../pages/PostMetadata';
import PostMetadataChanges from '../pages/PostMetadataChanges';

import { Grommet, Box, Button } from 'grommet';
import { Layout, Atoms } from '@tattle-made/ui';

//action
import { logoutUser } from '../../redux/actions/auth';

// access control
import AccessControl from './AccessControl';
import Queue from '../pages/Queue';
import { LogOut } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '../atomic-components/MenuItem';
import { SimpleMenuItem } from '../atomic-components/SimpleMenuItem';

const { AppShell, LayoutPortal } = Layout;
const { Status, AppLogo } = Atoms;

const SideNav = ({ location }) => {
    const sectionStatus = useSelector((state) => state.sectionStatus);
    const dispatch = useDispatch();

    console.log('===');
    console.log(sectionStatus);

    const onMenuItemClick = (e) => {
        e.stopPropagation();
    };

    const onUserOptionClick = (e) => {
        dispatch(logoutUser());
        e.stopPropagation();
    };

    const mainContent = (route) => {
        var patPostMetadataChanges = new RegExp('/posts/\\d*/metadata/changes');
        var patPostMetadata = new RegExp('/posts/\\d*/metadata');
        var patPosts = new RegExp();

        if (route.match(patPostMetadataChanges)) {
            console.log('here');
            return <PostMetadataChanges />;
        } else if (route.match(patPostMetadata)) {
            return <PostMetadata />;
        } else if (route === '/posts' || route.includes('/posts/')) {
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
        } else if (route === '/queue') {
            return <Queue />;
        } else {
            return <PostsTableItem />;
        }
    };

    return (
        <AppShell>
            <LayoutPortal
                primaryNavigationContent={
                    <Box pad={'small'} fill>
                        <Box>
                            <AppLogo name={'Kosh'} />
                        </Box>

                        <Box pad={'medium'} flex={'grow'}>
                            <Grommet>
                                <div onClick={(e) => onMenuItemClick(e)}>
                                    <SimpleMenuItem
                                        route={'/posts'}
                                        icon={'post'}
                                        label={'Posts'}
                                    />
                                    <SimpleMenuItem
                                        route={'/search'}
                                        icon={'search'}
                                        label={'Search'}
                                    />

                                    <AccessControl
                                        allowedPermissions={['user:canView']}
                                        text={() => this.dothis()}
                                        renderNoAccess={() => {}}
                                    >
                                        <SimpleMenuItem
                                            route={'/queue'}
                                            icon={'queue'}
                                            label={'Queues'}
                                        />
                                    </AccessControl>

                                    <AccessControl
                                        allowedPermissions={['user:canView']}
                                        text={() => this.dothis()}
                                        renderNoAccess={() => {}}
                                    >
                                        <SimpleMenuItem
                                            route={'/users'}
                                            icon={'user'}
                                            label={'Users'}
                                        />
                                    </AccessControl>
                                </div>
                            </Grommet>
                        </Box>

                        <Box margin={{ top: 'large' }}>
                            <Button plain onClick={onUserOptionClick}>
                                <LogOut />
                            </Button>
                        </Box>
                    </Box>
                }
                mainSectionContent={mainContent(location.pathname)}
            ></LayoutPortal>

            <Status
                type={sectionStatus.status}
                message={sectionStatus.message}
            />
        </AppShell>
    );
};

SideNav.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

export default SideNav;
