import React, { Component } from "react";
import { HeadingThree } from "../reusableComponents/text/HeadingThree";
import { Button } from "react-bootstrap";

export default class LoginCard extends Component {
  render() {
    return (
      <div className="login mx-auto mt-5">
        <div className="login-left" />
        <div className="login-right">
          <div className="login-right-heading">
            <HeadingThree text="Unlock your tools to fight fake tools " />
          </div>
          <form className="mt-2">
            <input type="text" placeholder="Enter Email" />
            <br />
            <input type="text" placeholder="Enter Password" />
            <br />
            <Button variant="primary" className="mt-5">
              Sign In
            </Button>
          </form>
        </div>
      </div>

      //   <div class="login">
      //     <div class="login-left" />
      //     <div class="login-right">
      //       <form>
      //         <p>fs</p>
      //         <input type="text" placeholder="Enter Email" />
      //         <br />
      //         <input type="text" placeholder="Enter Passworfd" />
      //         <br />
      //         <button type="button">Sign Inn</button>
      //       </form>
      //     </div>
      //   </div>
    );
  }
}
