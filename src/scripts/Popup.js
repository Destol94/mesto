export default class Popup {
  constructor(selectPopup) {
    this._popup = selectPopup;
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__btn-close-img')) {
      this.close();
    }
  }
}