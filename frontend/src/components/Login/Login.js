import React from 'react';
import Header from '../Header/Header';

function Login(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onLogin(password, email)
  }

  return (
    <div className="page">
      <Header buttonName="Регистрация" loggedIn={props.loggedIn} path={"/sign-up"} />
      <main className="account">
        <form className="form account__inputs" onSubmit={handleSubmit}>
          <h2 className="form__header">Вход</h2>
          <input className="form__field account__input" type="text" name="email" value={email} onChange={handleEmailChange}
            placeholder="Email" required autoComplete="off" />
          <input className="form__field account__input" type="password" name="password" value={password} onChange={handlePasswordChange}
            placeholder="Пароль" required autoComplete="off" />
          <button className="form__save-button account__save-button" type="submit">Войти</button>
        </form>
      </main>
    </div>
  )
}

export default Login;