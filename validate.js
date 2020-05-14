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

function addCheckInput(inputElem, input){
    const itemError = inputElem.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        itemError.classList.remove('popup__error-text_open');
        itemError.textContent = '';
    }
    else {
        itemError.classList.add('popup__error-text_open');
        itemError.textContent = input.validationMessage;
    }
}

function checkValid(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__field'));
    const button = form.querySelector('.popup__button-save');
    toggleButtonState(inputList, button);
    inputList.forEach(input => {
        input.addEventListener('input', function(){
            addCheckInput(form, input);
            toggleButtonState(inputList, button);
        });
    })
}

function formSearch() {
    elemForm = Array.from(document.querySelectorAll('.popup__container'));
    elemForm.forEach(element => {
        checkValid(element);
    });
}
formSearch();