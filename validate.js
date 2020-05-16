// const enableValidationt = ({
//     formSelector: '.popup__container',
//     inputSelector: '.popup__field',
//     submitButtonSelector: '.popup__button-save',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error-text_open'
//   });

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}

function toggleButtonState(inputList, button) {
    if (hasInvalidInput(inputList)){
        button.setAttribute("disabled", "disabled");
    }
    else {
        button.removeAttribute("disabled");
    }
}


function checkInputValidity(formElement, input){
    const itemError = formElement.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        itemError.classList.remove(`${enableValidationt.errorClass}`);
        itemError.textContent = '';
    }
    else {
        itemError.classList.add(`${enableValidationt.errorClass}`);
        itemError.textContent = input.validationMessage;
    }
}

function setValidationEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(`${enableValidationt.inputSelector}`));
    const button = form.querySelector(`${enableValidationt.submitButtonSelector}`);
    toggleButtonState(inputList, button);
    inputList.forEach(input => {
        input.addEventListener('input', function(){
            checkInputValidity(form, input);
            toggleButtonState(inputList, button);
        });
    })
}

function enableValidation() {
    elemForm = Array.from(document.querySelectorAll(`${enableValidationt.formSelector}`));
    elemForm.forEach(element => {
        setValidationEventListeners(element);
    });
}
enableValidation();