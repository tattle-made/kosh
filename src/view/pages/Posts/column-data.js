// import React, { Component } from "react";
// import { textFilter } from "react-bootstrap-table2-filter";
// import PreviewFormatterTable from "../../components/PreviewFormatterTable";
// import history from "../../../core-utils/history";
// import { withRouter, Redirect } from "react-router-dom";

// // todo: REFACTORING THIS IS SHOWING ERROR WHEN TEXT TYPE IS IMAGE OR VIDEO
// // TO REPRODUCE THIS , NAVIGATE TO PAGE 8
// const previewFormatter = (cell, row) => {
//   // console.log("this ", this);
//   // console.log("row");
//   // console.log(row);
//   // console.log("cell");
//   // console.log(cell);
//   return <PreviewFormatterTable row={row} cell={cell} />;
// };

// const columns = [
//   {
//     dataField: "type",
//     text: "Title"
//   },
//   {
//     dataField: "filename",
//     text: "Description",
//     formatter: previewFormatter,
//     // formatExtraData: this.props.posts,
//     events: {
//       onClick: (e, column, columnIndex, row, rowIndex) => {
//         const url = `/post/${row.id}`;
//         // history.push(url);
//         <Redirect to="/url" />;
//       }
//     }
//   },
//   {
//     dataField: "tags",
//     text: "Tags",
//     filter: textFilter(),
//     headerAlign: "center"
//   },
//   {
//     dataField: "actions",
//     text: "Actions"
//     // formatter: this.actionIconsFormatter,
//     // formatExtraData: this.props
//   }
// ];

// withRouter(columns);
// export default columns;
