import {content, popups, cardsContainer, profilePopup, formPopup, nameInput, jobInput, cardPopup, formCard, name, url, imagePopup, formImage, elementTemplate, buttonsCloseList, profile, nameProfile, occupationProfile, buttonEdit, buttonAdd, initialCards, validationSelectorsConfig} from '../utils/constants.js'

import {Card} from '../components/Card.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import Validate from '../components/Validate.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';


const profileValidation = new Validate(popupFormEdit, validationSelectorsConfig);
const newCardValidation = new Validate(popupFormAddCard, validationSelectorsConfig);
profileValidation.enableValidation();
newCardValidation.enableValidation();

const setProfileInfo = new UserInfo({});

const popupEdit = new PopupWithForm('.popup_profile', (items)=> {
  setProfileInfo.setUserInfo({name: items.inputName, ocupation: items.inpitOccupation});
})
popupEdit.setEventListeners();

const popupCard = new PopupWithForm('.popup_card', (items)=> {
  const card = new Section({
    items: [items],
    renderer: (item)=> {
      card.addItem(сreateCard(item, handleCardClick));
  }}, '.elements')
  card.renderer();
  popupCard.close();
})
popupCard.setEventListeners();


const popupView = new PopupWithImage('.popup_image');
popupView.setEventListeners();

const cardList = new Section({
  items: initialCards, 
  renderer: (item) => {
    cardList.addItem(сreateCard(item, handleCardClick));
    
}}, '.elements')

cardList.renderer();


function сreateCard (item, handleCardClick) {
  const cardItem = new Card({item, handleCardClick}, '#element');
  return cardItem.generateCard();
}

function editPopup () {
  const profileInfo = setProfileInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.occupation;
  profileValidation.toggleButtonState();
  popupEdit.open();
}


function handleCardClick(imgDate) {
  popupView.open(imgDate);
}

buttonEdit.addEventListener('click', editPopup);

buttonAdd.addEventListener('click', ()=> {
  newCardValidation.toggleButtonState();
  popupCard.open();
});


