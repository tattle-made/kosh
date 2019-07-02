import React from "react";

export const Card = props => {
  // console.log("card details ", props.card, props.display);

  if (props.card.type === "text" && props.display) {
    return (
      <div className="card card-modify text-center">
        {/* <div className="card-header bg-dark text-white">Card with Text</div> */}
        <div className="card-body">
          {/* <div className="card-title"> Lok Sabha elections</div> */}
          <div className="card-text">
            <p>{props.card.title}</p>
          </div>
        </div>
        <div className="card-footer  card-modify-footer">
          {props.card.tags.map(tag => (
            <span className="badge badge-pill  mr-2">{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (props.card.type === "image" && props.display) {
    return (
      <div className="card  card-modify text-white text-center">
        <img className="card-img" src={props.card.url} alt="" />
        <div className="card-footer  card-modify-foooter">
          {props.card.tags.map(tag => (
            <span className="badge badge-pill  mr-2">{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (props.card.type === "video" && props.display) {
    return (
      <div className="card  card-modify text-center">
        <div className="card-image">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe src={props.card.url} />
          </div>
        </div>
        <div className="card-body">
          {/* <div className="card-title">Transfer Truth</div> */}
        </div>
        <div className="card-footer  card-modify-footer">
          {props.card.tags.map(tag => (
            <span className="badge badge-pill  mr-2">{tag}</span>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="card card-modify text-center">
        {/* <div className="card-header bg-dark text-white">Card with Text</div> */}
        <div className="card-body">
          {/* <div className="card-title"> Lok Sabha elections</div> */}
          <div className="card-text text-white">
            <p>{props.card.title}</p>
          </div>
        </div>
        {/* <div className="card-footer  card-modify-footer">
          {props.card.tags.map(tag => (
            <span className="badge badge-pill  mr-2">{tag}</span>
          ))}
        </div> */}
      </div>
    );
  }
};
