import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col2: "before"
    };
  }

  infoPanelSlide() {
    this.setState({
      col2: "after"
    });
  }

  render() {
    return (
      <div className="info-panel mt-1">
        <div className={this.state.col2}>
          <div className="d-flex flex-column">
            <div className="d-flex p-4 panel">
              <div className="mr-auto align-self-center">INFO PANEL</div>
              <div className="align-self-center">
                <button
                  type="button"
                  className="btn cross-btn"
                  onClick={this.infoPanelSlide.bind(this)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            <div className="p-4">Election</div>
            <div className="p-4">Report</div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPanel;
