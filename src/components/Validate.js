export default class Validate {
  constructor(formItem, validationSelectorsConfig) {
    this._setting = validationSelectorsConfig;
    this._formItem = formItem;
  }
  
  enableValidation() {
    this._inputList = Array.from(this._formItem.querySelectorAll(`${this._setting.inputSelector}`));
    this._buttonElement = this._formItem.querySelector(`${this._setting.submitButtonSelector}`);
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this.toggleButtonState();
      })
    })
  }

  _showInputError(input, errorMessage) {
    input.classList.add(`${this._setting.inputErrorClass}`);
    const errorElem = this._formItem.querySelector(`.${input.id}-error`);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(`${this._setting.errorClass}`);
  }
  
  _hideInputError(input) {
    input.classList.remove(`${this._setting.inputErrorClass}`);
    const errorElem = this._formItem.querySelector(`.${input.id}-error`);
    errorElem.classList.remove(`${this._setting.errorClass}`);
    errorElem.textContent = '';
  }

  _isValid (input) {
    if (!input.validity.valid) {
     this._showInputError(input, input.validationMessage);
    }
    else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(input => {
      return !input.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(`${this._setting.inactiveButtonClass}`);
      this._buttonElement.setAttribute('disabled', 'disabled');
    }
    else {
      this._buttonElement.classList.remove(`${this._setting.inactiveButtonClass}`);
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  };
}


