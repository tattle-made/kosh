import React, { Component } from "react";

class PreviewFormatterTable extends Component {
  render() {
    if (this.props.row.type == "image") {
      return (
        <div className="card" style={prev}>
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${
              this.props.cell
            }?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`}
            alt="preview"
          />
        </div>
      );
    } else if (this.props.row.type == "video") {
      // <video
      //   // src={`https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${cell}?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`}
      //   // src={"https://youtu.be/DBXH9jJRaDk"}
      // />

      return (
        <div className="card" style={prev}>
          <iframe src="https://www.youtube.com/embed/hZFNVj505HQ" />
        </div>
      );
    } else if (this.props.row.type == "text") {
      return (
        <div className="card" style={prev}>
          <div className="card-text">{this.props.row.data}</div>
        </div>
      );
    }
  }
}

const prev = {
  width: "300px"
};

export default PreviewFormatterTable;
