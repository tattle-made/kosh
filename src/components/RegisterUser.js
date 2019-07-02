import React, { Component } from "react";
import { HeadingText, SubmitFormButton } from "../reusableComponents";

import { Dropdown } from "../reusableComponents/Dropdown";
import { TextFieldGroup } from "../reusableComponents/TextFieldGroup";
import { UploadInput } from "../reusableComponents/UploadInput";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card card-register">
              <div className="card-header text-center">
                <HeadingText text="Sign Up" />
              </div>
              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    // error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    // error={errors.email}
                  />
                  <Dropdown
                    name="role"
                    list={[
                      "Administrator",
                      "Editor",
                      "Author",
                      "Contributor",
                      "Subscriber"
                    ]}
                    onChange={this.onChange}
                  />
                  <UploadInput margin_bottom="mb-3" label="Upload image" />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    // error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    // error={errors.password2}
                  />
                  <button className="btn btn-block register-btn">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
