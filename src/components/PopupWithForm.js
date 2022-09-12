import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectPopup, handlerSubmit){
    super(selectPopup);
    this._callBack = handlerSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }
  _getInputValues(){
    this._inputsValues = {};
    this._inputs.forEach(input => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBack(this._getInputValues());
      this.close();
    })
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}