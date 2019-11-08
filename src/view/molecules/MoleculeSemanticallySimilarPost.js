import React from 'react'
import {Box, Heading} from 'grommet';
import {Atoms} from '@tattle-made/ui'
import {Spinner} from 'react-bootstrap';

const {MediaBlock} = Atoms;
const {SinglePost} = MediaBlock;

/**
* @author denny
* @function MoleculeSemanticallySimilarPost
status : default, loading, error
message : text depending on status
**/

const MoleculeSemanticallySimilarPost = ({visible, label, data}) => {
    return(
        <Box>
            <Heading level={4}>{label}</Heading>
            {
                data.status === 'default' ?
                <Box>  </Box>
                :
                data.status === 'loading' ?
                <Spinner animation="border" />
                :
                data.status==='data' && visible ?
                <Box direction={'row'} gap={'medium'}>
                    {data.data.map((data) => (
                        <SinglePost
                            type={data.type}
                            src={data.mediaUrl}
                        />
                    ))}
                </Box>
                :
                <Box></Box>
            }
        </Box>
    )
}

export default MoleculeSemanticallySimilarPost