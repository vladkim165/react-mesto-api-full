import React from 'react';
import resolved from '../../images/resolved.svg'
import rejected from '../../images/rejected.svg'

function InfoToolTip(props) {
  function handleCloseInfoToolTip() {
    props.onClose()
  }
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_info ${props.isOpen && 'popup__container_opened'}`}>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={handleCloseInfoToolTip}></button>
        <div className="popup__confirmation">
          <img className="popup__confirmation-image" src={props.isOk ? resolved : rejected}
            alt={props.isOk ? "Вы успешно зарегистрировались" : "Что-то пошло не так!"} />
          <h2 className="form__header">
            {props.isOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default InfoToolTip