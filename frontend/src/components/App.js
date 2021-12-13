import React from 'react';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.js';
import Register from './Register/Register.js';
import Login from './Login/Login.js';
import { register, authorize, unauthorize, getContent } from '../utils/Auth';
import InfoToolTip from './InfoToolTip/InfoToolTip.js';

function App() {

  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isResponseOk, setIsResponseOk] = React.useState(null);

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        setIsResponseOk(true);
      })
      .catch((err) => {
        setIsResponseOk(false);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsInfoToolTipOpen(true));
  }

  function handleAuthorize(password, email) {
    authorize(password, email)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        handleTokenCheck();
        setLoggedIn(true);
      })
      .catch((err) => {
        setIsInfoToolTipOpen(true);
        setIsResponseOk(false);
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleTokenCheck = () => {
    getContent()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === 'Необходима авторизация') {
          return;
        }
        setLoggedIn(true);
        setCurrentUser({ ...currentUser, email: res.email, name: res.name, about: res.about, avatar: res.avatar });
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  function handleDeleteToken() {
    unauthorize();
    history.push('/sign-in');
    setLoggedIn(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(url) {
    api.changeAvatar(url)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);


  React.useEffect(() => {
    if (loggedIn === true) {
      api.getCardItems()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(pre => ({
            ...pre, ...userInfo
          }));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      history.push('/');
    }
  }, [loggedIn, history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.unlikeCard(card._id).then((newCard) => {
        setCards((prevState) => prevState.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
    else {
      api.likeCard(card._id).then((newCard) => {
        setCards((prevState) => prevState.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => card._id !== c._id));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlace(card) {
    api.addNewCard(card).then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleOpenInfoToolTip(boolean) {
    setIsInfoToolTipOpen(boolean);
  }

  function handleIsResponseOk() {
    setIsResponseOk(true);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-up">
          <Register loggedIn={loggedIn} onRegister={handleRegister}
            onInfo={handleOpenInfoToolTip} onResponse={handleIsResponseOk} />
          <InfoToolTip isOpen={isInfoToolTipOpen} isOk={isResponseOk} onClose={closeAllPopups} />
        </Route>
        <Route path="/sign-in" >
          <Login loggedIn={loggedIn} onLogin={handleAuthorize}
            onInfo={handleOpenInfoToolTip} onResponse={handleIsResponseOk} />
          <InfoToolTip isOpen={isInfoToolTipOpen} isOk={isResponseOk} onClose={closeAllPopups} />
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn} components={
          <>
            <div className="page">
              <Header buttonName="Выйти" loggedIn={loggedIn} path={"/sign-in"} onLogOut={handleDeleteToken} />
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}
                onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
              <Footer />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
          </>
        } />
      </Switch>
    </CurrentUserContext.Provider>
  );
}


export default App;

