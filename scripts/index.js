import {content, popups, cardsContainer, profilePopup, formPopup, nameInput, jobInput, cardPopup, formCard, name, url, imagePopup, formImage, elementTemplate, buttonsCloseList, profile, nameProfile, occupationProfile, buttonEdit, buttonAdd, initialCards} from '../utils/constants.js'

import {Card} from './Card.js'
import {formList} from './Validate.js'

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
  fillFormText();
  openPopup(profilePopup);
  const editForm = formList.find((item) => {
    return item._formItem === profilePopup.querySelector('#popupFormEdit');
  });
  editForm.enableValidation();
}

export function fillFormText() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscapeEvent);
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

function formSubmitAdd (evt) {
  evt.preventDefault();
  const item = {};
  item.name = name.value;
  item.link = url.value;
  renderCard(item);
  formCard.reset();
  const cardAddForm = formList.find((item) => {
    return item._formItem === cardPopup.querySelector('#popupFormAddCard');
  })
  cardAddForm.toggleButtonState();
  closePopup(cardPopup);
}

function renderCard (elem) {
  
  const card = new Card(elem, '#element');
  cardsContainer.prepend(card.generateCard());
}

formPopup.addEventListener('submit', formProfileSubmitHandler);
buttonEdit.addEventListener('click', editPopup);
formCard.addEventListener('submit', formSubmitAdd);
buttonAdd.addEventListener('click', ()=> {
  openPopup(cardPopup)
});
initialCards.forEach(renderCard);
buttonsCloseList.forEach(item => {
  item.addEventListener('click' , () => {
    closePopup(item.closest('.popup'));
  });
});
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__btn-close')) { // Почитайте, что такое evt.currentTarget
      closePopup(popup);
    }
  })
})