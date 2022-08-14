import {imagePopup, formImage} from './date.js';
import {openPopup} from './index.js';

export class Card {
  constructor(date, templateElem) {
    this._date = date;
    this._templateElem = templateElem;
  }

  _getTemlpate() {
    const elem = this._templateElem.querySelector('.element').cloneNode(true);
    return elem;
  }

  _addInteractiveCard() {
    const buttonLikeImg = this._card.querySelector('.element__btn-heart');
    buttonLikeImg.addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__btn-heart_activ');
    });

    const buttonDeleteCard = this._card.querySelector('.element__trashcan');
    buttonDeleteCard.addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });

    this._img.addEventListener('click', () => { 
      const imageZoom = formImage.querySelector('.zoom__img');
      imageZoom.src = this._img.src;
      imageZoom.alr = this._img.alt;
      formImage.querySelector('.zoom__figcaption').textContent = this._img.alt;
      openPopup(imagePopup);
    })

  }

  generateCard() {
    this._card = this._getTemlpate();
    this._img = this._card.querySelector('.element__img');
    this._img.src = this._date.link;
    this._img.alt = this._date.name;
    this._card.querySelector('.element__text').textContent = this._date.name;
    this._addInteractiveCard();
    return this._card;
  }
}