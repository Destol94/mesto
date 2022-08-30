import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectPopup, handlerSubmit){
    super(selectPopup);
    this.callBack = handlerSubmit;
    
  }
  _getInputValues(){
    this.inputsValue = {
      name: this._popup.querySelector('.popup__name').value,
      occupation: this._popup.querySelector('.popup__occupation').value,
    }
    const cardInfo = this.inputsValue; 
    return cardInfo;
  }
  setEventListeners(evt) {
    evt.preventDefault();
    this._getInputValues();
  }
  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}