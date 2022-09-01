import {content, popups, cardsContainer, profilePopup, formPopup, nameInput, jobInput, cardPopup, formCard, name, url, imagePopup, formImage, elementTemplate, buttonsCloseList, profile, nameProfile, occupationProfile, buttonEdit, buttonAdd, initialCards} from '../utils/constants.js'

import {Card} from '../scripts/Card.js'
import Section from '../scripts/Section.js';
import Popup from '../scripts/Popup.js';
import UserInfo from '../scripts/UserInfo.js';
import {formList} from '../scripts/Validate.js'
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';


function setEscapeEvent (evt) {
  if (evt.key === 'Escape') {
    closePopup(content.querySelector('.popup_opened'));
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscapeEvent);
}

function editPopup () {
  const infoLoad = new UserInfo({});
  infoLoad.fillFormText({});
  const popup = new Popup(profilePopup);
  popup.open();

  const editForm = formList.find((item) => {
    return item._formItem === profilePopup.querySelector('#popupFormEdit');
  });
  editForm.enableValidation();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscapeEvent);
}

formPopup.addEventListener('submit', (evt)=> {
  const popupForm = new PopupWithForm(profilePopup, (evt)=> {
   
    popupForm.setEventListeners(evt);
    const setProfileInfo = new UserInfo({});
    setProfileInfo.setUserInfo({});
    popupForm.close();
  })
  popupForm.callBack(evt);
});

function handleCardClick(Event) {
  const popupView = new PopupWithImage(imagePopup);
  popupView.open(Event);
}

buttonEdit.addEventListener('click', editPopup);
formCard.addEventListener('submit', ()=> {
  const popupForm = new PopupWithForm(cardPopup, ()=> {
    const card = new Section({
      items: [popupForm._getInputValues()],
      renderer: (item)=> {
        item.link = item.occupation;
        const cardItem = new Card({item, handleCardClick}, '#element');


        card.addItem(cardItem.generateCard());
    }}, cardsContainer)
    card.renderer();
    popupForm.close();
  })
  popupForm.callBack();
});

buttonAdd.addEventListener('click', ()=> {
  const popup = new Popup(cardPopup);
  popup.open();
});


const cardList = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card({item, handleCardClick}, '#element');


    cardList.addItem(card.generateCard());
    
}}, cardsContainer)

cardList.renderer();

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const popupSetEventListener = new Popup(popup);
    popupSetEventListener.setEventListeners(evt);
  })
})