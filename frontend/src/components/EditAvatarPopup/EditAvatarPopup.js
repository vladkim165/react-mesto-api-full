import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function EditAvatarPopup(props) {
  const urlRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar(urlRef.current.value)
  }

  return (
    <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <>
        <section className="form__section">
          <input className="form__field form__field_input_link" type="url" name="link" id="link-input"
            placeholder="Ссылка на картинку" required autoComplete="off" ref={urlRef} />
          <span className="form__field-error" id="link-input-error"></span>
        </section>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup