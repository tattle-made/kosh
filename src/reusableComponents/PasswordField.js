import React from "react";

export default props => {
  return (
    <div className="form-group">
      <input
        type="password"
        className="form-control"
        placeholder={props.password_placeholder}
        name="password"
      />
    </div>
  );
};
