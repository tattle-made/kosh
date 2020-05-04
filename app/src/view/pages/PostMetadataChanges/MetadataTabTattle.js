import React, { useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import { Molecules } from '@tattle-made/ui';
const { EditableText } = Molecules;

var textData = {
    id: 1,
    type: 'text',
    label: 'Author Name',
    value: 'Manoj Shahidharan',
    author: 100,
};

/**
 * @author denny
 * @function MetadataTabFactCheckService
 **/

const MetadataTabTattle = () => {
    const [, setCurrentData] = useState(textData);
    const updateData = (data) => setCurrentData(data);

    return (
        <Box margin={{ top: 'small' }}>
            <Heading level={2}> Tattle Template </Heading>
            <EditableText data={textData} updateCallback={updateData} />
        </Box>
    );
};

export default MetadataTabTattle;
