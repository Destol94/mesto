
const settingsObject = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__span-error_active'
})

function enableValidation(settingsObject) {
  const forms = Array.from(document.querySelectorAll(`${settingsObject.formSelector}`));
  forms.forEach(form => {
    form.addEventListener('submit', (evt => {
      evt.preventDefault();
    }))
    setEventListeners(form, settingsObject);
  });
}

enableValidation(settingsObject);

function toggleButtonState (inputList, btnElem, settingsObject) {
  if (hasInvalidInput(inputList)) {
    btnElem.classList.add(`${settingsObject.inactiveButtonClass}`);
    btnElem.setAttribute('disabled', 'disabled');
  }
  else {
    btnElem.classList.remove(`${settingsObject.inactiveButtonClass}`);
    btnElem.removeAttribute('disabled', 'disabled');
  }
};


function setEventListeners(form, settingsObject) {
  const inputList = Array.from(form.querySelectorAll(`${settingsObject.inputSelector}`));
  const buttonElement = form.querySelector(`${settingsObject.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, settingsObject);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, buttonElement, settingsObject);
    })
  })
}

function showInputError(form, input, errorMessage, settingsObject) {
  input.classList.add(`${settingsObject.inputErrorClass}`);
  const errorElem = form.querySelector(`.${input.id}-error`);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(`${settingsObject.errorClass}`);
}

function hideInputError(form, input, settingsObject) {
  input.classList.remove(`${settingsObject.inputErrorClass}`);
  const errorElem = form.querySelector(`.${input.id}-error`);
  errorElem.classList.remove(`${settingsObject.errorClass}`);
  errorElem.textContent = '';
}

const isValid = (form, input) => {
  if (!input.validity.valid) {
   showInputError(form, input, input.validationMessage, settingsObject);
  }
  else {
    hideInputError(form, input, settingsObject);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  })
}
