import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Database, Search, Terminal, User} from 'react-feather';

import styled from 'styled-components'
import {Box, Heading} from 'grommet'

const icons = {
  'post': <Database/>,
  'search': <Search/>,
  'queue': <Terminal/>,
  'user': <User/>
}

const NavItem = styled(Link)`
  color: #29415c;
`;

const MenuItem = props => {
  return (
    <NavItem to={props.route}>
      <Box direction={'row'} gap={'small'} align={'baseline'} margin={{'bottom':'small'}}>
        {icons[props.icon]}
        <Heading level={2}> {props.label}</Heading>
      </Box>
    </NavItem>
  );
};

MenuItem.propTypes = {
  route: PropTypes.string.isRequired
};

export default MenuItem;
