import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Cards extends Component {
  constructor() {
    super();
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(val) {
    this.props.history.push(`/card/${val}`);
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-4" onClick={() => this.routeChange("1")}>
            <div className="card text-white text-center">
              <img
                className="card-img"
                src="https://source.unsplash.com/random/1000x300"
                alt=""
              />
            </div>
          </div>
          <div className="col-4">
            <div
              className="card text-center"
              onClick={() => this.routeChange("2")}
            >
              <div className="card-header bg-dark text-white">
                Card with Text
              </div>
              <div className="card-body">
                <div className="card-title"> Lok Sabha elections</div>
                <div className="card-text">
                  <p>
                    Lok Sabha Elections to be held on 29th april in Rajasthan
                  </p>
                  <p className="text-muted">Navbharat Times Report</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div
              className="card text-center"
              onClick={() => this.routeChange("3")}
            >
              <div className="card-image">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe src="https://www.youtube.com/embed/hZFNVj505HQ" />
                </div>
              </div>
              <div className="card-body">
                <div className="card-title">Transfer Truth</div>
                <div className="card-text text-muted">Know more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
