import React from "react";

function ImagePopup(props) { 
  return (
    <div className={`popup popup_open_background-image ${props.card.name && 'popup_opened'}`}>
      <div className="popup__background-image-container">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__image-title">{props.card.name}</h2>
        <img className="popup__background-image"
          src={props.card.link}
          alt={props.card.link} />
      </div>
    </div>
  )
}

export default ImagePopup