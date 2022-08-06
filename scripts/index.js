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



function setEscapeEvent (evt) {
  if (evt.key === 'Escape') {
    closePopup(content.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  const buttonElement = popup.querySelector('.popup__btn-submit');
  if (!popup.classList.contains('popup_image')){
    toggleButtonState(inputList, buttonElement, settingsObject);
  }
  document.addEventListener('keydown', setEscapeEvent);
}

function addInteractiveCard (elem, img) {
  const buttonLikeImg = elem.querySelector('.element__btn-heart');
  buttonLikeImg.addEventListener('click',  (evt) => {
    evt.target.classList.toggle('element__btn-heart_activ');
  });
  
  const buttonDeleteCard = elem.querySelector('.element__trashcan');
  buttonDeleteCard.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  img.addEventListener('click', () => {
    const imageZoom = formImage.querySelector('.zoom__img');
    imageZoom.src = img.src;
    imageZoom.alr = img.alt;
    formImage.querySelector('.zoom__figcaption').textContent = img.alt;
    openPopup(imagePopup);
  })
}

function editPopup () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  openPopup(profilePopup);
}

function addCardPopup() {
  openPopup(cardPopup);
}

function addElement(item) {
  const elem = elementTemplate.querySelector('.element').cloneNode(true);
  const img = elem.querySelector('.element__img');
  img.src = item.link;
  elem.querySelector('.element__text').textContent = item.name;
  img.alt = item.name;
  addInteractiveCard(elem, img);
  return elem;
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
  cardsContainer.prepend(addElement(elem));
}

formPopup.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', editPopup);
formCard.addEventListener('submit', formSubmitAdd);
buttonAdd.addEventListener('click', addCardPopup);
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