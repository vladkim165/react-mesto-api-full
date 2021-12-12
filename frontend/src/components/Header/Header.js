import React from "react";
import logoPath from '../../images/logo.svg'
import { Link } from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Header(props) {
  const userContext = React.useContext(CurrentUserContext)

  function handleLogOut() {
    if (props.loggedIn) {
      props.onLogOut()
    }
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место" />
      <div className="header__info-container">
        {props.loggedIn && <p className="header__mail">{userContext.email}</p>}
        <Link to={props.path} onClick={handleLogOut} className="header__button">{props.buttonName}</Link>
      </div>
    </header>
  )
}

export default Header