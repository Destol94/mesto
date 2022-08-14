import {content, popups, cardsContainer, profilePopup, formPopup, nameInput, jobInput, cardPopup, formCard, name, url, imagePopup, formImage, elementTemplate, buttonsCloseList, profile, nameProfile, occupationProfile, buttonEdit, buttonAdd, initialCards} from './date.js'

import {Card} from './card.js'
import {formList} from './validate.js'

function setEscapeEvent (evt) {
  if (evt.key === 'Escape') {
    closePopup(content.querySelector('.popup_opened'));
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (!popup.classList.contains('popup_image')){
    const openForm = formList.find((formElem) => {
      return formElem._formItem === popup.querySelector('.popup__form');
    })
    openForm.toggleButtonState();
  }
  document.addEventListener('keydown', setEscapeEvent);
}

function editPopup () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  openPopup(profilePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscapeEvent);
}

function formSubmitHandler (evt) {
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
  closePopup(cardPopup);
}

function renderCard (elem) {
  
  const card = new Card(elem, elementTemplate);
  cardsContainer.prepend(card.generateCard());
}

formPopup.addEventListener('submit', formSubmitHandler);
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
content.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
})
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__btn-close')) { // Почитайте, что такое evt.currentTarget
      closePopup(popup);
    }
  })
})