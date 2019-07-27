import React, { Component } from "react";
import HeadingOne from "../atomic-components/text/HeadingOne";

class PermissionDenied extends Component {
  render() {
    return (
      <div className="text-center text-white pt-5" style={styles}>
        <HeadingOne text="Aareee OO Sambha!" />
        <HeadingOne text="Permission hai kya tumree paas !" />
        <img src="https://i.giphy.com/media/l1IY5q3y8F41XWNwY/giphy.webp" />
      </div>
    );
  }
}

const styles = {
  backgroundImage: `url(https://media.giphy.com/media/xVn3ZmKrKIOLS/giphy.gif)`,
  width: "100vw",
  height: "100vh"
};
export default PermissionDenied;
