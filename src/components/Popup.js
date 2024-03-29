export default class Popup {
  constructor(selectPopup) {
    this._popup = document.querySelector(selectPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener('click', (evt)=> {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__btn-close-img')) {
        this.close();
      }
    })
  }
}