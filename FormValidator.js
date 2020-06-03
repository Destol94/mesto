const variablesForEnableValidation = ({
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    errorClass: 'popup__error-text_open'
  });

export default class FormValidator {
    constructor (selectorForm, allSettings = variablesForEnableValidation) {
        this._setting = allSettings;
        this._form = selectorForm;
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _toggleButtonState(button) {
        if (this._hasInvalidInput(this._inputList)){
            button.setAttribute("disabled", "disabled");
        }
        else {
            button.removeAttribute("disabled");
        }
    }

    _checkInputValidity(input) {
        const itemError = this._form.querySelector(`#${input.id}-error`);
        if (input.validity.valid) {
            itemError.classList.remove(`${this._setting.errorClass}`);
            itemError.textContent = '';
        }
        else {
            itemError.classList.add(`${this._setting.errorClass}`);
            itemError.textContent = input.validationMessage;
        }
    }


    enableValidation() {
        this._inputList = Array.from(this._form.querySelectorAll(`${this._setting.inputSelector}`));
        const button = this._form.querySelector(`${this._setting.submitButtonSelector}`);


        this._toggleButtonState(button);  //проверить переменные
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(button);
            });
        })
    }
}