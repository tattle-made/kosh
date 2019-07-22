import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const MenuItem = props => {
  return (
    <Link to={props.route}>
      <div className={`label-icon-container ${props.className}`}>
        <span className="icon">
          <FontAwesomeIcon icon={props.icon} color="#000637" />
        </span>
        <h2>{props.label}</h2>
      </div>
    </Link>
  );
};

export default MenuItem;
