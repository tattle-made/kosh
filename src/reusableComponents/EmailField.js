import React from "react";

export default props => {
  return (
    <div className="form-group">
      <input
        type="email"
        className="form-control"
        placeholder={props.email_placeholder}
        name="email"
      />
    </div>
  );
};
