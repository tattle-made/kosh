import React, { Component } from "react";
import AccessControl from "./accessControl";
import LoginCard from "./LoginCard";

class Test extends Component {

  dothis() {
    return console.log("this should print");
  }

  render() {
    return <AccessControl userPermissions={["read"]}
    allowedPermissions={["read"]} text={() => this.dothis()} 
    renderNoAccess = {() => alert("permission nhi hai bhai")}
    >
    <LoginCard />
    </AccessControl>
    }
}

export default Test;
