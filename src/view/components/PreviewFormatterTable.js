import React, { Component } from 'react';
import PropTypes from 'prop-types';

const imageSource = (userId, fileName) => {
  if(userId===159){
    return `https://tattle-services.s3.ap-south-1.amazonaws.com/${fileName}`
  }else{
    return `https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${fileName}?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`
  }
}

class PreviewFormatterTable extends Component {
  render() {
    if (this.props.row.type === 'image') {
      return (
        <div className='media-card'>
          <img
            src={imageSource(this.props.row.user_id, this.props.cell)}
            alt='preview'
          />
        </div>
      );
    } else if (this.props.row.type === 'video') {
      // <video
      //   // src={`https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/bot-posts%2F${cell}?alt=media&token=88192814-45bb-4302-b409-b5c26e90390b`}
      //   // src={"https://youtu.be/DBXH9jJRaDk"}
      // />

      return (
        <iframe title='d' src='https://www.youtube.com/embed/hZFNVj505HQ' />
        // <div className='card'>
        //   <iframe title='d' src='https://www.youtube.com/embed/hZFNVj505HQ' />
        // </div>
      );
    } else if (this.props.row.type === 'text') {
      return (
        <div className='card'>
          <div className='card-text'>{this.props.row.data}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

PreviewFormatterTable.propTypes = {
  row: PropTypes.object.isRequired,
  cell: PropTypes.string
};

export default PreviewFormatterTable;
