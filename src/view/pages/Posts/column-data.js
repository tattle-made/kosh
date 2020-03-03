import { textFilter } from "react-bootstrap-table2-filter";
import { actionIconsFormatter, previewFormatter, timestampFormatter } from "./column-formatter";

const column = (extraData, history) => {
  return [
    {
      dataField: "user.username",
      text: "User Name"
    },
    {
      dataField: "filename",
      text: "Preview",
      formatter: previewFormatter,
      formatExtraData: extraData[0].posts,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          const url = `/post/${row.id}`;
          history.push(url);
        }
      }
    },
    {
      dataField: "createdAt",
      text: "Added on",
      headerAlign: "center",
      formatter: timestampFormatter,
    },
    {
      dataField: "tags",
      text: "Tags",
      // filter: textFilter(),
      headerAlign: "center"
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: actionIconsFormatter,
      formatExtraData: [extraData]
    }
  ];
};

export default column;
