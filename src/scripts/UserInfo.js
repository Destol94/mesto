import {nameProfile, occupationProfile, nameInput, jobInput} from '../utils/constants.js';

export default class UserInfo {
  constructor({name = nameProfile, occupation = occupationProfile}) {
    this._name = name;
    this._occupation = occupation;
  }
  fillFormText({nameForm = nameInput, occupationForm = jobInput}){
    const userInfo = this.getUserInfo();
    nameForm.value = userInfo.name;
    occupationForm.value = userInfo.occupation;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
  }
  setUserInfo({userNameValue = nameInput.value, ocupationValie = jobInput.value}) {
    this._name.textContent = userNameValue;
    this._occupation.textContent = ocupationValie;
  }
}