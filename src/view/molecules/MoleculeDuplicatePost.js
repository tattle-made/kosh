import React from 'react'
import {Box, Heading} from 'grommet';
import {Atoms} from '@tattle-made/ui'
import {Spinner} from 'react-bootstrap';

const {MediaBlock} = Atoms;
const {SinglePost} = MediaBlock;

/**
* @author denny
* @function MoleculeDuplicatePost
status : default, loading, error
message : text depending on status
**/

const MoleculeDuplicatePost = ({visible, title, data}) => {
    return(
        <Box>
            <Heading level={4}>{title}</Heading>
            {
                data.status === 'default' ?
                <Box>  </Box>
                :
                data.status === 'loading' ?
                <Spinner animation="border" />
                :
                data.status==='data' && visible ?
                <SinglePost
                        type={data.type}
                        src={data.mediaUrl}
                />
                :
                <Box></Box>
            }
        </Box>
    )
}

export default MoleculeDuplicatePost