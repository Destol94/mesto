export default class UserInfo {
  constructor({name, occupation, avatar}) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
    this._avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
  }
  setUserInfo({name: userNameValue, about: ocupationValie, avatar}) {
    this._name.textContent = userNameValue;
    this._occupation.textContent = ocupationValie;
    this._avatar.src = avatar;
  }
}