import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function AddPlacePopup(props) {

  function handleAddPlaceSubmit(e) {
    e.preventDefault()
    props.onAddPlace({ name: nameValue, link: imageValue })
    setNameValue('')
    setImageValue('')
  }

  const [nameValue, setNameValue] = React.useState('')
  const [imageValue, setImageValue] = React.useState('')

  function handleNameChange(e) {
    setNameValue(e.target.value)
  }

  function handleImageChange(e) {
    setImageValue(e.target.value)
  }


  return (
    <PopupWithForm name="add-card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
      <>
        <section className="form__section">
          <input className="form__field form__field_input_place-name" type="text" name="name" id="place-name-input"
            placeholder="Название" required autoComplete="off" minLength="2" maxLength="30" value={nameValue} onChange={handleNameChange} />
          <span className="form__field-error" id="place-name-input-error"></span>
        </section>
        <section className="form__section">
          <input className="form__field form__field_input_link" type="url" name="link" id="url-input"
            placeholder="Ссылка на картинку" required autoComplete="off" value={imageValue} onChange={handleImageChange} />
          <span className="form__field-error" id="url-input-error"></span>
        </section>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup