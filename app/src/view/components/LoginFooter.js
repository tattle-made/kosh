import React, { Component } from "react";
import HeadingThree from "../atomic-components/text/HeadingThree";
import BodyTwo from "../atomic-components/text/BodyTwo";
import packageJsonFile from '../../../package.json';

const {version} = packageJsonFile;

class LoginFooter extends Component {
  render() {
    return (
      <div>
        <br/><br/><br/>
        <BodyTwo text={`version : ${version}`} />
      </div>
      // <div className="login-footer">
      //   {/* <div>
      //     <HeadingThree text="Reach Out" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //   </div>
      //   <div>
      //     <HeadingThree text="Social" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //   </div>
      //   <div>
      //     <HeadingThree text="Values" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //   </div>
      //   <div>
      //     <HeadingThree text="Values" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //     <BodyOne text="facebook" />
      //   </div> */}
        
      // </div>
    );
  }
}

export default LoginFooter;
