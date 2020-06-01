import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccessControl from '../../components/AccessControl';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import PreviewFormatterTable from '../../components/PreviewFormatterTable';
import Moment from 'moment';
import { Box, Button } from 'grommet';
import { Database } from 'react-feather';
import { Link } from 'react-router-dom';
import MoleculeViewMetadataFromOriginalService from '../../molecules/MoleculeViewMetadataFromOriginalService';

const actionIconsFormatter = (cell, row, rowIndex, extraData) => {
    const data = extraData[0][0];
    const page = extraData[1];
    return (
        <Box gap={'small'} direction={'row'}>
            <AccessControl
                allowedPermissions={['user:canDelete']}
                renderNoAccess={() => {}}
            >
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="mr-5"
                    onClick={() => {
                        data.postDelete(row.id, page);
                    }}
                />
            </AccessControl>
            <FontAwesomeIcon icon={faCheck} />
            <Link to={`/posts/${row.id}/metadata`}>
                <Database size={24} />
            </Link>
            <MoleculeViewMetadataFromOriginalService postId={row.id} />
        </Box>
    );
};

const previewFormatter = (cell, row) => {
    return <PreviewFormatterTable row={row} cell={cell} />;
};

const timestampFormatter = (cell, row) => {
    return <p> {Moment(cell).format('lll')} </p>;
};

export { actionIconsFormatter, previewFormatter, timestampFormatter };
