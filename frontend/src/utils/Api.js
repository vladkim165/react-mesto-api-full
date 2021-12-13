class Api {
  constructor(url) {
    this.url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCardItems() {
    return fetch(`${this.url}/cards/`, {
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  setUserInfo(userInfo) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.info
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  addNewCard(item) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  unlikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  changeAvatar(avatarLink) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }
}

const api = new Api('https://api.mesto-prod.nomoredomains.rocks');

export default api;