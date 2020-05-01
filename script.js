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
const popupField = popup.querySelectorAll('.popup__field');
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


function addInteractiveCard(card) {
    addActionLike(card);
    deleteCard(card);
    viewImage(card);
    photoGrid.prepend(card);
}

function CardLoad() {
    for (let i=0; i<initialCards.length; i++) {
        card = createCard();
        card.querySelector('.photo-grid__img').src = initialCards[i].link;
        card.querySelector('.photo-grid__img').alt = initialCards[i].name;
        card.querySelector('.photo-grid__figcaption').textContent = initialCards[i].name;
        addInteractiveCard(card);
    }
}
CardLoad();

function createCard() {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode('true');
    return card;
}

function editProfile() {
    popup.classList.add('popup_opened');
    formElement[0].classList.add('popup__container_open');
    popupField[0].value = profileName.textContent;
    popupField[1].value = profileDescription.textContent;
}

//закрытие форм
function closeForm() {
    popup.classList.remove('popup_opened');
    formElement.forEach(item => {
        item.classList.remove('popup__container_open');
    });
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupField[0].value;
    profileDescription.textContent = popupField[1].value;
}

function formSubmitHandlerAddImg (evt) {
    evt.preventDefault();
    card = createCard();
    card.querySelector('.photo-grid__img').src = popupField[3].value;
    card.querySelector('.photo-grid__img').alt = popupField[2].value;
    card.querySelector('.photo-grid__figcaption').textContent = popupField[2].value;
    addInteractiveCard(card);
    popupField[3].value = '';
    popupField[2].value = '';
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

function viewImage(card) {
    const img = card.querySelector('.photo-grid__img');
    img.addEventListener('click', function() {
        popup.classList.add('popup_opened');
        const viewImageTemplate = document.querySelector('#viewImage').content;
        const viewImage = viewImageTemplate.cloneNode('true');
        viewImage.querySelector('.viewImage__item').src = img.src;
        viewImage.querySelector('.viewImage__item').alt = img.alt;
        viewImage.querySelector('.viewImage__text').textContent = img.alt;
        popup.prepend(viewImage);
        delViewImage = document.querySelector('.viewImage').querySelector('.popup__button-close');
        delViewImage.addEventListener('click', function(){
            if (popup.querySelector('.viewImage')) {
                popup.querySelector('.viewImage').remove();
                popup.classList.remove('popup_opened');
            }
        })
    });
}

addEventlistener();

function addEventlistener() {
    addButton.addEventListener('click', function(){
        popup.classList.add('popup_opened');
        formElement[1].classList.add('popup__container_open');
    });
    //закрытие формы по нажатию кнопку на сохранить
    buttonSave.forEach(element => {
        element.addEventListener('click', closeForm);
    });

    formElement[1].addEventListener('submit', formSubmitHandlerAddImg);
    formElement[0].addEventListener('submit', formSubmitHandler);
    
    buttonClose.forEach(element => {
        element.addEventListener('click', closeForm);
    });
    editButton.addEventListener('click', editProfile);
}
