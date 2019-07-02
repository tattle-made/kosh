import React from "react";

export const ListItem = props => {
  return (
    <div>
      <li className="nav-item">
        <a className="nav-link" href="#">
          {props.breadcrumb} &raquo;
        </a>
      </li>
    </div>
  );
};
