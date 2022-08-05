function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach(form => {
    form.addEventListener('submit', (evt => {
      evt.preventDefault();
    }))
    setEventListeners(form);
  });
}

enableValidation(); 

function toggleButtonState (inputList, BtnElem) {
  if (hasInvalidInput(inputList)) {
    BtnElem.classList.add('popup__btn-submit_disabled');
  }
  else {
    BtnElem.classList.remove('popup__btn-submit_disabled');
  }
};


function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__btn-submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function showInputError(form, input, errorMessage) {
  input.classList.add('popup__input_error');
  const errorElem = form.querySelector(`.${input.id}-error`);
  errorElem.textContent = errorMessage;
  errorElem.classList.add('popup__span-error_active');
}

function hideInputError(form, input) {
  input.classList.remove('popup__input_error');
  const errorElem = form.querySelector(`.${input.id}-error`);
  errorElem.classList.remove('popup__span-error_active');
  errorElem.textContent = '';
}

const isValid = (form, input) => {
  if (!input.validity.valid) {
   showInputError(form, input, input.validationMessage);
  }
  else {
    hideInputError(form, input);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  })
}
