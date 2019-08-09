import React from 'react';

const Card = ({ key, card, display }) => {
  console.log('card details ', card, display);
  if (card.type === 'text' && display) {
    return (
      <div className='card card-modify text-center'>
        {/* <div className="card-header bg-dark text-white">Card with Text</div> */}
        <div className='card-body'>
          {/* <div className="card-title"> Lok Sabha elections</div> */}
          <div className='card-text'>
            <p>{card.title}</p>
            <p>sdfwdfasfasfasfsdfsfsf</p>
          </div>
        </div>
        <div className='card-footer  card-modify-footer'>
          {card.tags.map(tag => (
            <span className='badge badge-pill  mr-2'>{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (card.type === 'image' && display) {
    return (
      <div className='card  card-modify text-white text-center'>
        <img className='card-img' src={card.url} alt='' />
        <div className='card-footer  card-modify-foooter'>
          {card.tags.map(tag => (
            <span className='badge badge-pill  mr-2'>{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (card.type === 'video' && display) {
    return (
      <div className='card  card-modify text-center'>
        <div className='card-image'>
          <div className='embed-responsive embed-responsive-16by9'>
            <iframe src={card.url} />
          </div>
        </div>
        <div className='card-body'>
          {/* <div className="card-title">Transfer Truth</div> */}
        </div>
        <div className='card-footer  card-modify-footer'>
          {card.tags.map(tag => (
            <span className='badge badge-pill  mr-2'>{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (card.title !== '') {
    return <div className='card text-center'>{card.title}</div>;
  } else {
    return (
      <div className='card card-modify text-center'>
        {/* <div className="card-header bg-dark text-white">Card with Text</div> */}
        <div className='card-body'>
          {/* <div className="card-title"> Lok Sabha elections</div> */}
          <div className='card-text text-white'>
            <p>{card.title}</p>
          </div>
        </div>
        {/* <div className="card-footer  card-modify-footer">
          {card.tags.map(tag => (
            <span className="badge badge-pill  mr-2">{tag}</span>
          ))}
        </div> */}
      </div>
    );
  }
};

export default Card;
