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
    renderNoAccess = {() => console.log("u dont have permission")}
    >
    <LoginCard />
    </AccessControl>
    }
}

export default Test;
