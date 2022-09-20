const content = document.querySelector('.page');
const popups = Array.from(document.querySelectorAll('.popup'));
const cardsContainer = content.querySelector('.elements');
const profilePopup = content.querySelector('.popup_profile');
const formPopup = content.querySelector('.popup__form_edit');
const nameInput = formPopup.querySelector('.popup__name');
const jobInput = formPopup.querySelector('.popup__occupation');
const cardPopup = content.querySelector('.popup_card');
const formCard = cardPopup.querySelector('.popup__form_card');
const name = formCard.querySelector('.popup__name');
const url = formCard.querySelector('.popup__occupation');
const imagePopup = content.querySelector('.popup_image');
const formImage = imagePopup.querySelector('.zoom');
const elementTemplate = content.querySelector('#element').content;
const buttonsCloseList = Array.from(content.querySelectorAll('.popup__btn-close'));
const profile = content.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const occupationProfile = profile.querySelector('.profile__occupation');
const buttonEdit = content.querySelector('.profile__edit-button');
const buttonAdd = content.querySelector('.profile__add-button');
const inputAvatar = document.querySelector('.popup_avatar').querySelector('.popup__input');
const profileAvatar = document.querySelector('.profile__avatar');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const validationSelectorsConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_active'
})
export {profileAvatar,inputAvatar,content, popups, cardsContainer, profilePopup, formPopup, nameInput, jobInput, cardPopup, formCard, name, url, imagePopup, formImage, elementTemplate, buttonsCloseList, profile, nameProfile, occupationProfile, buttonEdit, buttonAdd, initialCards, validationSelectorsConfig}