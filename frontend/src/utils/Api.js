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
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  unlikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  changeAvatar(avatarLink) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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