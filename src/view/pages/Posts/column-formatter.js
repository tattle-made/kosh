import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccessControl from '../../components/AccessControl';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import PreviewFormatterTable from '../../components/PreviewFormatterTable';

const actionIconsFormatter = (cell, row, rowIndex, extraData) => {
  const data = extraData[0][0];
  const page = extraData[1];
  return (
    <div>
      <AccessControl
        allowedPermissions={['user:canDelete']}
        renderNoAccess={() => {}}
      >
        <FontAwesomeIcon
          icon={faTrashAlt}
          className='mr-5'
          onClick={() => {
            data.postDelete(row.id, page);
          }}
        />
      </AccessControl>
      <FontAwesomeIcon icon={faCheck} />
    </div>
  );
};

const previewFormatter = (cell, row) => {
  return <PreviewFormatterTable row={row} cell={cell} />;
};

export { actionIconsFormatter, previewFormatter };
