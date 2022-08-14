import {imagePopup, formImage} from '../utils/constants.js';
import {openPopup} from './index.js';

export class Card {
  constructor(data, templateElem) {
    this._data = data;
    this._templateElem = templateElem;
  }

  _getTemlpate() {
    const elem = document.querySelector(this._templateElem).content.querySelector('.element').cloneNode(true);
    return elem;
  }

  _toggleBtnLike() {
    this._buttonLikeImg.classList.toggle('element__btn-heart_activ');
  }

  _deleteCard() {
    this._buttonDeleteCard.closest('.element').remove();
  }
  
  _enlargeImage() {
    this._imageZoom = formImage.querySelector('.zoom__img');
    this._imageZoom.src = this._img.src;
    this._imageZoom.alr = this._img.alt;
    formImage.querySelector('.zoom__figcaption').textContent = this._img.alt;
    openPopup(imagePopup);
  }

  _addInteractiveCard() {
    this._buttonLikeImg = this._card.querySelector('.element__btn-heart');
    this._buttonLikeImg.addEventListener('click', () => {
      this._toggleBtnLike();
    });

    this._buttonDeleteCard = this._card.querySelector('.element__trashcan');
    this._buttonDeleteCard.addEventListener('click', () => {
      this._deleteCard();
    });

    this._img.addEventListener('click', () => {
      this._enlargeImage();
    })

  }

  generateCard() {
    this._card = this._getTemlpate();
    this._img = this._card.querySelector('.element__img');
    this._img.src = this._data.link;
    this._img.alt = this._data.name;
    this._card.querySelector('.element__text').textContent = this._data.name;
    this._addInteractiveCard();
    return this._card;
  }
}