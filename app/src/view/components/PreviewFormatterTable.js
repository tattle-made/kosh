import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Video from '../atomic-components/Video'

class PreviewFormatterTable extends Component {
  render() {
    if (this.props.row.type === 'image') {
      return (
        <div className='media-card'>
          <img
            src={this.props.row.mediaUrl}
            alt='preview'
          />
        </div>
      );
    } else if (this.props.row.type === 'video') {
      return (<Video src={this.props.row.mediaUrl}/>)

      // return (
      //   <iframe title='d' src='https://www.youtube.com/embed/hZFNVj505HQ' />
      //   // <div className='card'>
      //   //   <iframe title='d' src='https://www.youtube.com/embed/hZFNVj505HQ' />
      //   // </div>
      // );
      
    } else if (this.props.row.type === 'text') {
      return (
        <div className='card'>
          <div className='card-text'>
            {this.props.row.data}
            Preview not available for text posts
          </div>
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
