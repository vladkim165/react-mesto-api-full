import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Card from '../Card/Card.js'

function Main(props) {
  const userContext = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={userContext.avatar} alt="Аватар профиля" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userContext.name}</h1>
          <p className="profile__subtitle">{userContext.about}</p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((cardData) => {
            return (
              <Card card={cardData} key={cardData._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main

