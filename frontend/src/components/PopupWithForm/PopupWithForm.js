import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container ${props.isOpen && 'popup__container_opened'}`}>
        <form className="form" name={props.name} onSubmit={props.onSubmit}>
          <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
          <h2 className="form__header">{props.title}</h2>
          {props.children}
          <button className="form__save-button" type="submit" aria-label="Сохранить">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm

