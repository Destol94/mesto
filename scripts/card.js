export class Card {
  constructor({item, handleCardClick }, templateSelector) {
    this._data = item;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick ;
  }

  _getTemlpate() {
    const elem = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return elem;
  }

  _toggleBtnLike() {
    this._buttonLikeImg.classList.toggle('element__btn-heart_activ');
  }

  _deleteCard() {
    this._buttonDeleteCard.closest('.element').remove();
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
    this._img.addEventListener('click', (Event) => this._handleCardClick(Event));

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