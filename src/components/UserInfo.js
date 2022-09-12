export default class UserInfo {
  constructor({name, occupation}) {
    this._name = document.querySelector(name);
    this._occupation = document.querySelector(occupation);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
  }
  setUserInfo({name: userNameValue, ocupation: ocupationValie}) {
    this._name.textContent = userNameValue;
    this._occupation.textContent = ocupationValie;
  }
}