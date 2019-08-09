import React from 'react';

const Card = ({ card, display }) => {
  if (card.type === 'text' && display) {
    return (
      <div className='card text-center'>
        <div className='card-body'>
          <div className='card-text'>
            <p>{card.title}</p>
          </div>
        </div>
        <div className='card-footer'>
          {card.tags.map(tag => (
            <span key={tag} className='badge badge-pill  mr-2'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  } else if (card.type === 'image' && display) {
    return (
      <div className='card text-white text-center'>
        <img className='card-img' src={card.url} alt='' />
        <div className='card-footer '>
          {card.tags.map(tag => (
            <span className='badge badge-pill  mr-2'>{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (card.type === 'video' && display) {
    return (
      <div className='card text-center'>
        <div className='card-image'>
          <div className='embed-responsive embed-responsive-16by9'>
            <iframe src={card.url} />
          </div>
        </div>
        <div className='card-body' />
        <div className='card-footer '>
          {card.tags.map(tag => (
            <span className='badge badge-pill mr-2'>{tag}</span>
          ))}
        </div>
      </div>
    );
  } else if (card.title !== '') {
    return <div className='card text-center'>{card.title}</div>;
  } else {
    return (
      <div className='card text-center'>
        <div className='card-body'>
          <div className='card-text text-white'>
            <p>{card.title}</p>
          </div>
        </div>
        <div className='card-footer '>
          {card.tags.map(tag => (
            <span className='badge badge-pill mr-2'>{tag}</span>
          ))}
        </div>
      </div>
    );
  }
};

export default Card;
