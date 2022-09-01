import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
  }
  open(Event) {
    super.open();
    this._imageZoom = this._popup.querySelector('.zoom__img');
    this._imageZoom.src = Event.target.src;
    this._imageZoom.alt = Event.target.alt;
    this._popup.querySelector('.zoom__figcaption').textContent = Event.target.alt;
  }
}