import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Card(props) {

  const userContext = React.useContext(CurrentUserContext)

  const isOwner = userContext._id === props.card.owner._id
  const isLiked = props.card.likes.some(item => item._id === userContext._id)

  function handleClick () {
    props.onCardClick(props.card)
  }

  function handleLikeClick () {
    props.onCardLike(props.card)
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card)
  }

  return (
    <div className="card">
      <li className="element">
        <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        {isOwner && <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>}
        <div className="element__info">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-area">
            <button className={`element__like-button ${isLiked && 'element__like-button_active'}`} type="button" onClick={handleLikeClick}></button>
            <span className="element__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </li>
    </div>
  )
}

export default Card