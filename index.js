import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {page, profileName, profileDescription, addButton, editButton, photoGrid, popup, changeProfile, addCard, name,
    description, imageTitle, linkImg, buttonSave, buttonClose,
    closeForm, closePopupPressingButtom} from './library.js';
import {initialCards} from './data.js';
function loadCards() {
    initialCards.forEach(item => {
        const card = new Card(item.name, item.link);
        photoGrid.prepend(card.generateCard());
    })
}

loadCards();

function editProfile() {
    popup.classList.add('popup_opened');
    changeProfile.classList.add('popup__container_open');
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
    page.addEventListener('keyup', closePopupPressingButtom);
    //проверка валидности формы при открытии
    new FormValidator(changeProfile).enableValidation();
}



function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = name.value;
    profileDescription.textContent = description.value;
}

function formSubmitHandlerAddImg (evt) {
    evt.preventDefault();
    const card = new Card(imageTitle.value, linkImg.value);
    photoGrid.prepend(card.generateCard());
    linkImg.value = '';
    imageTitle.value = '';
}

function addEventlistener() {
    addButton.addEventListener('click', function() {
        popup.classList.add('popup_opened');
        addCard.classList.add('popup__container_open');
        page.addEventListener('keyup', closePopupPressingButtom);
        //проверка валидности формы при открытии
        new FormValidator(addCard).enableValidation();
    });
    //закрытие формы по нажатию кнопку на сохранить
    buttonSave.forEach(element => {
        element.addEventListener('click', closeForm);
    });

    addCard.addEventListener('submit', formSubmitHandlerAddImg);
    changeProfile.addEventListener('submit', formSubmitHandler);
    
    buttonClose.forEach(element => {
        element.addEventListener('click', closeForm);
    });
    editButton.addEventListener('click', editProfile);
    popup.addEventListener('mousedown', function(evt){
        if (evt.target.classList.contains('popup')){
            closeForm();
        }
    });
}
addEventlistener();