import React from "react";
import { Alert } from "react-bootstrap";

export const Footer = ({ visible, alert_type, closeFooter, message }) => {
  return (
    <div className="footer">
      <Alert variant={alert_type} onClose={closeFooter} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
};
