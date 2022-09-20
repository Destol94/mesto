import {profileAvatar,inputAvatar,content, popups, cardsContainer, profilePopup, formPopup, nameInput, jobInput, cardPopup, formCard, name, url, imagePopup, formImage, elementTemplate, buttonsCloseList, profile, nameProfile, occupationProfile, buttonEdit, buttonAdd, initialCards, validationSelectorsConfig} from '../utils/constants.js'

import {Card} from '../components/Card.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator  from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import './index.css';
import Api from '../components/Api.js';

let userId;

const profileValidation = new FormValidator(popupFormEdit, validationSelectorsConfig);
const newCardValidation = new FormValidator(popupFormAddCard, validationSelectorsConfig);
const avatarValidation = new FormValidator(popupFormAvatar, validationSelectorsConfig);
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();

const setProfileInfo = new UserInfo({name: '.profile__name', occupation: '.profile__occupation', avatar: '.profile__avatar'});


const popupEdit = new PopupWithForm('.popup_profile', (items)=> {
  api.patchUserInfo(nameInput.value, jobInput.value)
    .then(res=> setProfileInfo.setUserInfo(res))
    .catch(error => console.log(error))
    .finally(()=> {
      popupEdit.changeTextButton();
    })

})
popupEdit.setEventListeners();


const popupCard = new PopupWithForm('.popup_card', (item)=> {
  api.patchCard(name.value, url.value)
  .then(res => {
    cardList.renderer([res]);
  })
  .catch(error => {
    console.log(error)
  })
  .finally(()=> {
    popupCard.changeTextButton();
  })
})
popupCard.setEventListeners();


const popupConfirm = new PopupWithForm('.popup_confirm')
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_avatar', ()=> {
  api.patchAvatar(inputAvatar.value)
  .then(res => {
    setProfileInfo.setUserInfo(res);
  })
  .catch(error => console.log(error))
  .finally(()=> {
    popupAvatar.changeTextButton();
  })
})
popupAvatar.setEventListeners();

function сreateCard (item) {
  const cardItem = new Card({
    item,
    handleCardClick
    },
    userId,
    (id)=> {
      popupConfirm.open();
      popupConfirm.changeSubmitHandler(() =>{
        api.deleteCard(id)
        .then(res => {
          cardItem.deleteCard();
        })
        .catch(error => {
          console.log(error)
        })
      })
    },
    (id) => {
      if(cardItem.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          cardItem.setNumberLike(res.likes);
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        api.addLike(id)
        .then(res => {
          cardItem.setNumberLike(res.likes);
        })
        .catch(error => {
          console.log(error)
        })
      }
    }, '#element');
  return cardItem.generateCard();
}


const popupView = new PopupWithImage('.popup_image');
popupView.setEventListeners();

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-50', 
  headers: { 
    authorization: "5aadda0f-b2b3-4db2-8e38-f46c0ff389a4", 
    "Content-Type": "application/json", 
  }
})

api.getUserInfo()

  .then((res)=> {
    userId = res._id;
    setProfileInfo.setUserInfo(res)})
  .catch(error => console.log(error));


const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(сreateCard(item));
    
}}, '.elements')

api.getInitialCards()

  .then((cards)=> {
    // console.log(cards);
    cards.reverse();
    cardList.renderer(cards);
  })
  .catch(error => {
    console.log(error);
  })


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

profileAvatar.addEventListener('click', () => {
  popupAvatar.open();
  avatarValidation.toggleButtonState();
})