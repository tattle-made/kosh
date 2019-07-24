import { textFilter } from "react-bootstrap-table2-filter";
import { actionIconsFormatter, previewFormatter } from "./column-formatter";

const column = (props, history) => {
  return [
    {
      dataField: "type",
      text: "Title"
    },
    {
      dataField: "filename",
      text: "Description",
      formatter: previewFormatter,
      formatExtraData: props.posts,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          const url = `/post/${row.id}`;
          history.push(url);
        }
      }
    },
    {
      dataField: "tags",
      text: "Tags",
      filter: textFilter(),
      headerAlign: "center"
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: actionIconsFormatter,
      formatExtraData: props
    }
  ];
};

export default column;
