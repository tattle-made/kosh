import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control ", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};
