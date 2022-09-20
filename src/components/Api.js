export default class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }
  getUserInfo() {
    return fetch(`${this._address}/users/me`,{
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  patchUserInfo(inputValue, aboutValue){
    return fetch(`${this._address}/users/me`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${inputValue}`,
        about: `${aboutValue}`
      })
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  patchCard(nameCard, linkCard) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameCard}`,
        link: `${linkCard}`
      })
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  addLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  deleteLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
  patchAvatar(inputValue) {
    return fetch(`${this._address}/users/me/avatar`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${inputValue}`
      })
    })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Произошла ошибка');
    })
  }
}