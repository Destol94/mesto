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
        itemError.classList.remove(`${variablesForEnableValidation.errorClass}`);
        itemError.textContent = '';
    }
    else {
        itemError.classList.add(`${variablesForEnableValidation.errorClass}`);
        itemError.textContent = input.validationMessage;
    }
}

function setValidationEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(`${variablesForEnableValidation.inputSelector}`));
    const button = form.querySelector(`${variablesForEnableValidation.submitButtonSelector}`);
    toggleButtonState(inputList, button);
    inputList.forEach(input => {
        input.addEventListener('input', function(){
            checkInputValidity(form, input);
            toggleButtonState(inputList, button);
        });
    })
}

function enableValidation() {
    elemForm = Array.from(document.querySelectorAll(`${variablesForEnableValidation.formSelector}`));
    elemForm.forEach(element => {
        setValidationEventListeners(element);
    });
}
enableValidation();