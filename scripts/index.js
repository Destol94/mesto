const content = document.querySelector('.page');
const popup = content.querySelector('.popup');
const elements = content.querySelector('.elements');
const formEdit = document.getElementById('#popupFormEdit');
const formAddCard = document.getElementById('#popupFormAddCard');
const nameInput = formEdit.querySelector('.popup__name');
const jobInput = formEdit.querySelector('.popup__occupation');
const closeButtons = Array.from(popup.querySelectorAll('.popup__btn-close'));
const profile = content.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__name');
const occupationProfile = profile.querySelector('.profile__occupation');
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const zoom = popup.querySelector('.zoom');

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

function addElement(item) {
  const elementTemplate = document.querySelector('#element').content;
  const elem = elementTemplate.querySelector('.element').cloneNode(true);
  const img = elem.querySelector('.element__img');
  img.src = item.link;
  elem.querySelector('.element__text').textContent = item.name;
  elem.querySelector('.element__img').alt = item.name;
  elements.prepend(elem);

  const buttonLikeImg = elem.querySelector('.element__heart-img');
  buttonLikeImg.addEventListener('click',  () => {
    if (!(buttonLikeImg.src.indexOf('heart') === -1)) {
      buttonLikeImg.src = './image/Union.svg';
    }
    else {
      buttonLikeImg.src = './image/heart.svg'
    }
  });

  const buttonDeleteCard = elem.querySelector('.element__trashcan');
  buttonDeleteCard.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  img.addEventListener('click', (evt) => {
    zoom.querySelector('.zoom__img').src = img.src;
    zoom.querySelector('.zoom__img').alr = img.alt;
    zoom.querySelector('.zoom__figcaption').textContent = img.alt;
    openPopup(evt);
  })
}

function openPopup(evt) {
  popup.classList.add('popup_opened');
  if (evt.target.closest('.profile__edit-button')) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = occupationProfile.textContent;
    formEdit.classList.add('popup_opened');
  }
  if (evt.target.closest('.profile__add-button')) {
    formAddCard.classList.add('popup_opened');
  }
  if (evt.target.closest('.element__img')) {
    zoom.classList.add('popup_opened');
  }
}

function closePopup(evt) {
  popup.classList.remove('popup_opened');
  evt.target.closest('.popup_opened').classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = jobInput.value;
  closePopup(evt);
}

function formSubmitAdd (evt) {
  evt.preventDefault();
  const item = {};
  const name = formAddCard.querySelector('.popup__name');
  const url = formAddCard.querySelector('.popup__occupation');
  item.name = name.value;
  item.link = url.value;
  addElement(item);
  name.value = '';
  url.value = '';
  closePopup(evt);
}
editButton.addEventListener('click', openPopup);
closeButtons.forEach(item => {(item.addEventListener('click', closePopup))});
formEdit.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', formSubmitAdd);
addButton.addEventListener('click', openPopup);
initialCards.forEach(addElement);