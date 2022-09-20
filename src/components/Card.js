export class Card {
  constructor({item, handleCardClick}, userId, submitHandler, handlerLike, templateSelector) {
    this._popup = document.querySelector('#popup_confirm');
    this._data = item;
    this._likes = this._data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleFormSubmitDelete = submitHandler;
    this._handlerLike = handlerLike;
    this._userId = userId;
  }

  _getTemlpate() {
    const elem = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return elem;
  }

  _fillLike() {
    this._buttonLikeImg.classList.add('element__btn-heart_activ');
  } 
  _makeEmptyLike() {
    this._buttonLikeImg.classList.remove('element__btn-heart_activ');
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
  
  isLiked() {
    return this._likes.find(like => like._id === this._userId);
  }

  _addInteractiveCard() {
    this._buttonLikeImg = this._card.querySelector('.element__btn-heart');
    if(this.isLiked()) {
      this._fillLike()
    }
    else {
      this._makeEmptyLike();
    }
    this._buttonLikeImg.addEventListener('click', () => {
      this._handlerLike(this._data._id);
    });
    this._buttonDeleteCard = this._card.querySelector('.element__trashcan');
    this._buttonDeleteCard.addEventListener('click', () => {
      this._handleFormSubmitDelete(this._data._id);
    });
    this._img.addEventListener('click', () => this._handleCardClick(this._data));

  }
  setNumberLike(newLikes) {
    this._likes = newLikes;
    this._card.querySelector('.element__number-of-likes').textContent = this._likes.length;
    if(this.isLiked()) {
      this._fillLike()
    }
    else {
      this._makeEmptyLike();
    }
  }

  generateCard() {
    this._card = this._getTemlpate();
    this._img = this._card.querySelector('.element__img');
    this._img.src = this._data.link;
    this._img.alt = this._data.name;
    this._card.querySelector('.element__text').textContent = this._data.name;
    this._addInteractiveCard();
    this.setNumberLike(this._likes);
    if (this._userId !== this._data.owner._id){
      this._buttonDeleteCard.style.display = 'none';
    }
    return this._card;
  }
}