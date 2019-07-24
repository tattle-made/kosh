import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccessControl from "../../components/AccessControl";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import PreviewFormatterTable from "../../components/PreviewFormatterTable";

const actionIconsFormatter = (cell, row, rowIndex, props) => {
  return (
    <div>
      <AccessControl
        allowedPermissions={["user:canView"]}
        renderNoAccess={() => console.log("u dont have permission")}
      >
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="mr-5"
          onClick={() => {
            props.postDelete(row.id, row.id);
            console.log("delete");
            // this.refresh();
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
