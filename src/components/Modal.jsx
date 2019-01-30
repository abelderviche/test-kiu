import React, { Component } from 'react'

export default class Modal extends Component {
  render() {
    const {title,url,handleCloseModal} = this.props;
    return (
    <div className="modal" onClick={handleCloseModal}>
        <div className="modal__box">
            Title: {title}
            url: {url}
        </div>
    </div>
    )
  }
}
