import React, { Component } from 'react';
import './Image-upload.css';


class ImageUpload extends Component {
  
  render () {
    return (
      <form>
        <input className="fileInput" label='upload file' type='file' onChange={this.props.handleFileUpload} />
        <div id="upload-msg"></div>
      </form>
    );
  }
}

export default ImageUpload;
