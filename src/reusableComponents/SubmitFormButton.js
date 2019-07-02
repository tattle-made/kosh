import React from "react";
import classnames from "classnames";

export default ({ text, colored }) => {
  return (
    <button
      type="submit"
      className={classnames("btn btn-block mt-4", { "btn-submit": colored })}
    >
      {text}
    </button>
  );
};
