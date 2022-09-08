import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectPopup) {
    super(selectPopup);
    this._imageZoom = this._popup.querySelector('.zoom__img');
    this._figcaption = this._popup.querySelector('.zoom__figcaption');
  }
  open(img) {
    super.open();
    this._imageZoom.src = img.link;
    this._imageZoom.alt = img.name;
    this._figcaption.textContent = img.name;
  }
}