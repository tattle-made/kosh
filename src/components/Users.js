import React, { Component } from "react";

class Users extends Component {
  render() {
    return (
      <div className="table-responsive container-fluid">
        <div className="table table-hover">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Posts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>John</td>
                <td>Doe</td>
                <td>jdoe@gmail.com</td>
                <td>Subscriber</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Will</td>
                <td>Johnson</td>
                <td>will@yahoo.com</td>
                <td>Adminstrator</td>
                <td>5</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Shannon</td>
                <td>Williams</td>
                <td>shannon@yahoo.com</td>
                <td>Super Adminstrator</td>
                <td>9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
