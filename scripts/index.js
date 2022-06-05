const content = document.querySelector('.page');
const popupContainer = content.querySelector('.popup-container');
const elements = content.querySelector('.elements');
const profilePopup = document.querySelector('.popup__form-edit');
const cardPopup = document.querySelector('.popup__form-card');
const imagePopup = popupContainer.querySelector('.zoom');
const nameInput = profilePopup.querySelector('.popup__name');
const jobInput = profilePopup.querySelector('.popup__occupation');
const elementTemplate = document.querySelector('#element').content;
const buttonsCloseList = Array.from(popupContainer.querySelectorAll('.popup__btn-close'));
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
    const imageZoom = imagePopup.querySelector('.zoom__img');
    imageZoom.src = img.src;
    imageZoom.alr = img.alt;
    imagePopup.querySelector('.zoom__figcaption').textContent = img.alt;
    openPopup(imagePopup);
  })
}

function openPopup(item) {
  popupContainer.classList.add('popup_opened');
  item.classList.add('popup_opened');
}


function editPopup () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  profilePopup.classList.add('popup_opened');
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
  elem.querySelector('.element__img').alt = item.name;
  addInteractiveCard(elem, img);
  elements.prepend(elem);
  /*renderCard(elem);*/
}


function closePopup(evt) {
  popupContainer.classList.remove('popup_opened');
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
  const name = cardPopup.querySelector('.popup__name');
  const url = cardPopup.querySelector('.popup__occupation');
  item.name = name.value;
  item.link = url.value;
  addElement(item);
  name.value = '';
  url.value = '';
  closePopup(evt);
}

/*function renderCard (elem) {
  elements.prepend(elem);
}*/

buttonsCloseList.forEach(item => {(item.addEventListener('click', closePopup))});
profilePopup.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', editPopup);
cardPopup.addEventListener('submit', formSubmitAdd);
buttonAdd.addEventListener('click', addCardPopup);
initialCards.forEach(addElement);