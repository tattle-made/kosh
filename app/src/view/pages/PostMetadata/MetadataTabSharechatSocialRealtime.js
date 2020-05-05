import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from 'grommet';
import { RealTimeUserActivityFeed } from './components/RealTimeUserActivityFeed';

/**
 * @author
 * @function MetadatatabSharechatSocialRealtime
 **/

const viewers = [
    { id: 24, name: 'denny_admin' },
    { id: 45, name: 'vishal_kohli' },
    { id: 20, name: 'geeta' },
    { id: 20, name: 'neha_reader' },
];

const editors = [
    { id: 45, name: 'kruttika_author', key: 'emotion', value: 'Punjab' },
    { id: 98, name: 'neha', key: 'cta', value: 'yes' },
];

const MetadatatabSharechatSocialRealtime = () => {
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
    });

    return (
        <Box fill>
            <Heading> Sharechat Social Realtime Metadata Fields </Heading>
            <RealTimeUserActivityFeed
                viewers={viewers}
                editors={editors}
                connectionStatus="connected"
            />
        </Box>
    );
};

export default MetadatatabSharechatSocialRealtime;
