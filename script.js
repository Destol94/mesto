const page = document.querySelector('.page');
const main = page.querySelector('.main');
const profile = main.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const photoGrid = main.querySelector('.photo-grid');
const popup = main.querySelector('.popup');
const formElement = popup.querySelectorAll('.popup__container');
const changeProfile = popup.querySelector('#change-profile');
const addCard = popup.querySelector('#addCard');
const name = popup.querySelector('#name');
const description = popup.querySelector('#description');
const imageTitle = popup.querySelector('#image-title');
const viewImage = popup.querySelector('.viewImage');
const linkImg = popup.querySelector('#link-img');
const buttonSave = popup.querySelectorAll('.popup__button-save');
const buttonClose = popup.querySelectorAll('.popup__button-close');
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
const enableValidationt = ({
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-text_open'
  });
  
function createCard() {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode('true');
    return card;
}


function addActionLike(card) {
    const like = card.querySelector('.photo-grid__like');
        like.addEventListener('click', function(event){
            event.target.classList.toggle('photo-grid__like_black');
        });
}

function deleteCard(card) {
    const del = card.querySelector('.photo-grid__delete');
    del.addEventListener('click', function(event){
        event.target.parentNode.remove();
    });
}

function closeViewImage() {
    popup.classList.remove('popup_opened');
    viewImage.classList.remove('popup__container_open');
}

function closePopupPressingButtom(evt) {
    if (evt.code === 'Escape') {
        closeForm();
    }
 }

function browsingImage(card) { 
    const img = card.querySelector('.photo-grid__img');
    img.addEventListener('click', function() {
        popup.classList.add('popup_opened');
        viewImage.querySelector('.viewImage__item').src = img.src;
        viewImage.querySelector('.viewImage__item').alt = img.alt;
        viewImage.querySelector('.viewImage__text').textContent = img.alt;
        viewImage.classList.add('popup__container_open');
        document.querySelector('.viewImage').querySelector('.popup__button-close').addEventListener('click', closeViewImage);
        page.addEventListener('keyup', closePopupPressingButtom)
    }); 
}

function addInteractiveCard(card) {
    addActionLike(card);
    deleteCard(card);
    browsingImage(card);
    photoGrid.prepend(card);
}

function loadCard() {
    for (let i=0; i<initialCards.length; i++) {
        card = createCard();
        card.querySelector('.photo-grid__img').src = initialCards[i].link;
        card.querySelector('.photo-grid__img').alt = initialCards[i].name;
        card.querySelector('.photo-grid__figcaption').textContent = initialCards[i].name;
        addInteractiveCard(card);
    }
}
loadCard();


function editProfile() {
    popup.classList.add('popup_opened');
    changeProfile.classList.add('popup__container_open');
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
    page.addEventListener('keyup', closePopupPressingButtom);
    enableValidation();
}

//закрытие форм
function closeForm() {
    popup.classList.remove('popup_opened');
    formElement.forEach(form => {
        form.querySelectorAll('.popup__error-text').forEach(element => {
            element.classList.remove('popup__error-text_open');
        });
        form.classList.remove('popup__container_open');
    });
    closeViewImage();
    page.removeEventListener('keyup', closePopupPressingButtom);

}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = name.value;
    profileDescription.textContent = description.value;
}

function formSubmitHandlerAddImg (evt) {
    evt.preventDefault();
    card = createCard();
    card.querySelector('.photo-grid__img').src = linkImg.value;
    card.querySelector('.photo-grid__img').alt = imageTitle.value;
    card.querySelector('.photo-grid__figcaption').textContent = imageTitle.value;
    addInteractiveCard(card);
    linkImg.value = '';
    imageTitle.value = '';
}

function addEventlistener() {
    addButton.addEventListener('click', function() {
        popup.classList.add('popup_opened');
        addCard.classList.add('popup__container_open');
        page.addEventListener('keyup', closePopupPressingButtom);
        enableValidation();
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
 