export const page = document.querySelector('.page');
export const main = page.querySelector('.main');
export const profile = main.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileDescription = profile.querySelector('.profile__description');
export const addButton = profile.querySelector('.profile__add-button');
export const editButton = profile.querySelector('.profile__edit-button');
export const photoGrid = main.querySelector('.photo-grid');
export const popup = main.querySelector('.popup');
export const formElement = popup.querySelectorAll('.popup__container');
export const changeProfile = popup.querySelector('#change-profile');
export const addCard = popup.querySelector('#addCard');
export const name = popup.querySelector('#name');
export const description = popup.querySelector('#description');
export const imageTitle = popup.querySelector('#image-title');
export const viewImage = popup.querySelector('.viewImage');
export const linkImg = popup.querySelector('#link-img');
export const buttonSave = popup.querySelectorAll('.popup__button-save');
export const buttonClose = popup.querySelectorAll('.popup__button-close');


export function closeViewImage() {
    viewImage.classList.remove('popup__container_open');
}

//закрытие форм
export function closeForm() {
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

export function closePopupPressingButtom(evt) {
    if (evt.code === 'Escape') {
        closeForm();
    }
 }