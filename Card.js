import {viewImage, closeViewImage, closePopupPressingButtom, page, popup} from './library.js';
export default class Card {
    constructor(text, link) {
        this._text = text;
        this._link = link;
    }
    _getTemplate() {
        const card = document.querySelector('#card-template').content.cloneNode('true');
        const cardImg = card.querySelector('.photo-grid__img');
        cardImg.src = this._link;
        cardImg.alt = this._text;
        card.querySelector('.photo-grid__figcaption').textContent = this._text;
        return card;
    }
    _initLikeListener() {
        const like = this.card.querySelector('.photo-grid__like');
            like.addEventListener('click', (event) => {
                event.target.classList.toggle('photo-grid__like_black');
            });
    }
    _initDeleteCardListener() {
        const del = this.card.querySelector('.photo-grid__delete');
        del.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        });
    }
    _initFullImageListener() { 
        const img = this.card.querySelector('.photo-grid__img');
        img.addEventListener('click', () => {
            popup.classList.add('popup_opened');
            const viewImgItem = viewImage.querySelector('.viewImage__item')
            viewImgItem.src = img.src;
            viewImgItem.alt = img.alt;
            viewImage.querySelector('.viewImage__text').textContent = img.alt;
            viewImage.classList.add('popup__container_open');
            document.querySelector('.viewImage').querySelector('.popup__button-close').addEventListener('click', closeViewImage);
            page.addEventListener('keyup', closePopupPressingButtom);
        }); 
    }
    _initListeners() {
        this._initLikeListener();
        this._initDeleteCardListener();
        this._initFullImageListener();
    }
    generateCard() {        
        this.card = this._getTemplate();
        this._initListeners();
        return this.card;
    }

}