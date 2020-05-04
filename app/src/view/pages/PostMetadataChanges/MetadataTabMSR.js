import React, {useState} from 'react'
import { Box, Heading } from 'grommet'
import { Molecules } from '@tattle-made/ui';
const { EditableText, EditableEnum } = Molecules;

/**
* @author denny
* @function MetadataTabFactCheckService
**/

var textData = {
    id: 1,
    type: 'text',
    label: 'Author Name',
    value: 'Manoj Shahidharan',
    author: 100,
};



const MetadataTabMSR = () => {
    const [currentData, setCurrentData] = useState(textData);
    const updateData = (data) => setCurrentData(data);

    return (
        <Box margin={{ top: 'small' }}>
            <Heading level={2}> Microsoft Research Fields </Heading>
            <EditableText data={currentData} updateCallback={updateData} />
        	
        </Box>
    );
}

export default MetadataTabMSR