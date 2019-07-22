import React from "react";

const UploadInput = ({ label, margin_bottom }) => {
  return (
    <div className={`custom-file ${margin_bottom}`}>
      <input className="custom-file-input" type="file" id="myfile" />
      <label className="custom-file-label" htmlFor="myfile">
        {label}
      </label>
    </div>
  );
};

export default UploadInput;
