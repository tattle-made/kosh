import React, { Component } from "react";
import {
  EmailField,
  PasswordField,
  SubmitFormButton
} from "../reusableComponents";

import { HeadingText, SubHeadingOne } from "../reusableComponents/text";

export default props => (
  <div className="container-fluid" style={styles.container}>
    <HeadingText text="Log In" />
    <SubHeadingOne text="Unlock your tools to fight Fake News" />
    <form>
      <EmailField email_placeholder="Email" />
      <PasswordField password_placeholder="Password" />
      <SubmitFormButton text="Submit" colored={true} />
    </form>
  </div>
);

const styles = {
  container: {
    width: "40rem"
  }
};
