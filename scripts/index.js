const content = document.querySelector('.page');
const interactiveContainer = content.querySelector('.popup-container');
const cardsContainer = content.querySelector('.elements');
const profilePopup = content.querySelector('.popup_form_edit');
const nameInput = profilePopup.querySelector('.popup__name');
const jobInput = profilePopup.querySelector('.popup__occupation');
const formCard = content.querySelector('.popup_form_card');
const name = formCard.querySelector('.popup__name');
const url = formCard.querySelector('.popup__occupation');
const imagePopup = content.querySelector('.zoom');
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
  item.closest('.popup').classList.add('popup_opened');
}

function editPopup () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
  openPopup(profilePopup);
}

function addCardPopup() {
  openPopup(formCard);
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
  popup.closest('.popup').classList.remove('popup_opened');
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
  closePopup(formCard);
}

function renderCard (elem) {
  cardsContainer.prepend(addElement(elem));
}

profilePopup.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', editPopup);
formCard.addEventListener('submit', formSubmitAdd);
buttonAdd.addEventListener('click', addCardPopup);
initialCards.forEach(renderCard);
buttonsCloseList.forEach(item => {
  item.addEventListener('click' , () => {
    closePopup(item.closest('.popup'));
  });
});