import React from "react";
import PropTypes from "prop-types";

export const Dropdown = ({ name, onChange, list }) => {
  return (
    <div className="form-group">
      <select
        className="form-control"
        id="roles"
        name={name}
        onChange={onChange}
      >
        {list.map(list_item => (
          <option>{list_item}</option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired
};
