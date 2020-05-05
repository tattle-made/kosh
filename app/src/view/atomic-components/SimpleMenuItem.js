import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Database, Search, Terminal, User } from 'react-feather';

import styled from 'styled-components';
import { Grommet, Box, Heading, Text, ResponsiveContext } from 'grommet';

const icons = {
    post: <Database />,
    search: <Search />,
    queue: <Terminal />,
    user: <User />,
};

const NavItem = styled(Link)`
    color: #f0c6bc;
`;

export const SimpleMenuItem = (props) => {
    const size = React.useContext(ResponsiveContext);
    console.log('size : ', size);
    console.log(ResponsiveContext);
    return (
        <Grommet>
            <NavItem to={props.route} background={'#ffff44'}>
                <Box
                    direction={'row'}
                    gap={'small'}
                    align={'baseline'}
                    margin={{ bottom: 'small' }}
                >
                    {icons[props.icon]}
                    {size !== 'small' ? (
                        <Heading level={2}> {props.label}</Heading>
                    ) : null}
                </Box>
            </NavItem>
        </Grommet>
    );
};

SimpleMenuItem.propTypes = {
    route: PropTypes.string.isRequired,
};
