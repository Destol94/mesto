let page = document.querySelector('.page');
let main = page.querySelector('.main');
let profile = main.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
const editButton = profile.querySelector('.profile__edit-button');
let popup = main.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
const buttonSave = popup.querySelector('.popup__button-save');
const buttonClose = popup.querySelector('.popup__button-close');
let popupField = popup.querySelectorAll('.popup__field');

function editProfile() {
    popup.classList.add('popup_opened');
    popupField[0].value = profileName.textContent;
    popupField[1].value = profileDescription.textContent;
}
editButton.addEventListener('click', editProfile);

function closeEdit() {
    popup.classList.remove('popup_opened');
}
buttonClose.addEventListener('click', closeEdit);


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupField[0].value;
    profileDescription.textContent = popupField[1].value;
}
formElement.addEventListener('submit', formSubmitHandler);
buttonSave.addEventListener('click', closeEdit);