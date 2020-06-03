import {popup, viewImage, closeViewImage, closePopupPressingButtom, page} from './script.js';
export class Card {
    constructor(text, link) {
        this._text = text;
        this._link = link;
    }
    _getTemplate() {
        const card = document.querySelector('#card-template').content.cloneNode('true');
        card.querySelector('.photo-grid__img').src = this._link;
        card.querySelector('.photo-grid__img').alt = this._text;
        card.querySelector('.photo-grid__figcaption').textContent = this._text;
        return card;
    }
    _addActionLike() {
        const like = this.card.querySelector('.photo-grid__like');
            like.addEventListener('click', (event) => {
                event.target.classList.toggle('photo-grid__like_black');
            });
    }
    _deleteCard() {
        const del = this.card.querySelector('.photo-grid__delete');
        del.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        });
    }
    _browsingImage() { 
        const img = this.card.querySelector('.photo-grid__img');
        img.addEventListener('click', () => {
            popup.classList.add('popup_opened'); 
            viewImage.querySelector('.viewImage__item').src = img.src;
            viewImage.querySelector('.viewImage__item').alt = img.alt;
            viewImage.querySelector('.viewImage__text').textContent = img.alt;
            viewImage.classList.add('popup__container_open');
            document.querySelector('.viewImage').querySelector('.popup__button-close').addEventListener('click', closeViewImage);
            page.addEventListener('keyup', closePopupPressingButtom);
        }); 
    }
    _addEvent() {
        this._addActionLike();
        this._deleteCard();
        this._browsingImage();
    }
    generateCard() {        
        this.card = this._getTemplate();
        this._addEvent();
        return this.card;
    }

}