import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import CurrentUserContext from '../../contexts/CurrentUserContext'

const EditProfilePopup = (props) => {

  const userContext = React.useContext(CurrentUserContext)

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      info: description,
    })
  }

  React.useEffect(() => {
    setName(userContext.name)
    setDescription(userContext.about)
  }, [userContext, props.isOpen])

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" onSubmit={handleSubmit}
      isOpen={props.isOpen} onClose={props.onClose}>
      <>
        <section className="form__section">
          <input className="form__field form__field_input_name" type="text" name="name" id="name-input" required
            autoComplete="off" minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
          <span className="form__field-error" id="name-input-error"></span>
        </section>
        <section className="form__section">
          <input className="form__field form__field_input_bio" type="text" name="info" id="bio-input" required
            autoComplete="off" minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
          <span className="form__field-error" id="bio-input-error"></span>
        </section>
      </>
    </PopupWithForm>
  );
};

export default EditProfilePopup;