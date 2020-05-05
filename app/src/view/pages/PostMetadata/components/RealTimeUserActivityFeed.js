import React from 'react';
import { Box, Text } from 'grommet';

export const RealTimeUserActivityFeed = ({
    viewers,
    editors,
    connectionStatus,
}) => {
    let viewerString = '';
    if (viewers.length === 1) {
        viewerString = viewers[0].name + 'is viewing';
    } else {
        const commaSeparatedViewerNames = viewers
            .map((viewer) => viewer.name)
            .join(', ');
        const indexOfLastComma = commaSeparatedViewerNames.lastIndexOf(',');
        viewerString =
            [
                commaSeparatedViewerNames.slice(0, indexOfLastComma),
                'and',
                commaSeparatedViewerNames.slice(indexOfLastComma).split(' ')[1],
            ].join(' ') + ' are viewing';
    }

    return (
        <Box>
            {connectionStatus === 'connected' ? (
                <Box direction={'column'}>
                    <Text color={'status-error'}>
                        You are {connectionStatus}
                    </Text>
                    <Text color={'neutral-3'}> {viewerString} </Text>
                    {editors.map((editor) => (
                        <Text color={'neutral-2'}>
                            {editor.name} is editing {editor.key}{' '}
                        </Text>
                    ))}
                </Box>
            ) : (
                <Box direction={'column'}>
                    <Text color={'status-error'}>
                        You are {connectionStatus}
                    </Text>
                </Box>
            )}
        </Box>
    );
};
