let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__occupation');
let closeButton = popup.querySelector('.popup__btn-close');
let profile = content.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__name');
let occupationProfile = profile.querySelector('.profile__occupation');
let editButton = content.querySelector('.profile__edit-button');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = occupationProfile.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
  popup.querySelector('.popup__name').value = "";
  popup.querySelector('.popup__occupation').value = "";
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 