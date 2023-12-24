/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Popup.js
class Popup {
  constructor(container) {
    this.container = container;
    this.popup = null;
    this.input = null;
    this.btnCancel = null;
    this.btnOkay = null;
  }
  init() {
    this.modalUI();
    this.clickBtnCancel();
    this.clickInput();
  }
  modalUI() {
    this.popup = document.createElement('div');
    this.popup.classList.add('popup-container');
    this.popup.innerHTML = `
              <form class="popup">
                <h3 class="popup-title">Что-то пошло не так</h3>
                <p class="popup-description">К сожалению, нам не удалось определить ваше местоположение,
                пожалуйста, дайте разрешение на использование геолокации, либо введите коррдинаты вручную.</p>
                <label for="name">Широта и долгота через запятую</label>
                <input id="name" class="input" placeholder="00.0000, 00.0000">
                <div class="popup-footer">
                  <div class='error'></div>
                  <div class="buttons">
                    <button class="button button-cancel">Отмена</button>
                    <button class="button button-okay type="submit">Ок</button>
                  </div>
                </div>
              </form>`;
    this.container.append(this.popup);
    this.input = this.popup.querySelector('.input');
    this.btnCancel = this.popup.querySelector('.button-cancel');
    this.errorMessage = this.popup.querySelector('.error');
    this.form = this.popup.querySelector('.popup');
    this.error = this.popup.querySelector('.error');
  }
  addPopUpContainer() {
    this.popup.classList.add('open');
  }
  removePopUpContainer() {
    this.popup.classList.remove('open');
  }
  showErrorMessage(message) {
    this.errorMessage.textContent = message;
    this.error.classList.add('open');
  }
  hideErrorMessage() {
    this.errorMessage.textContent = '';
    this.error.classList.remove('open');
  }
  clickInput() {
    this.input.addEventListener('input', e => {
      e.preventDefault();
      this.hideErrorMessage();
    });
  }
  clickBtnCancel() {
    this.btnCancel.addEventListener('click', e => {
      e.preventDefault();
      this.removePopUpContainer();
      this.hideErrorMessage();
      this.form.reset();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/Validator.js
class Validator {
  constructor() {
    this.latitude = null;
    this.longitude = null;
    this.wholeDigit = null;
    this.fractionalDigit = null;
  }
  collectionNumber(integer, fractional) {
    this.integerNum = Number(integer);
    this.fractionalNum = Number(fractional) / 10 ** fractional.length;
    if (this.integerNum < 0 || this.integerNum === 0 && this.integer.charAt(0) === '-') {
      return this.integerNum - this.fractionalNum;
    }
    return this.integerNum + this.fractionalNum;
  }
  getCheckValue(value) {
    if (!value || value.length !== 4) {
      return {
        result: false,
        errorMessage: 'Введите 2 числа с целой и дробной частью'
      };
    }
    if (Number(value[1]) < 0 || Number(value[3] < 0)) {
      return {
        result: false,
        errorMessage: 'Дробная часть не может быть отрицательной'
      };
    }
    this.latitude = this.collectionNumber(value[0], value[1]);
    this.longitude = this.collectionNumber(value[2], value[3]);
    if (Number(value[0]) > 90) {
      return {
        result: false,
        errorMessage: 'Широта не может быть больше 90'
      };
    }
    if (Number(value[0]) < -90) {
      return {
        result: false,
        errorMessage: 'Широта не может быть меньше -90'
      };
    }
    if (Number(value[2]) > 180) {
      return {
        result: false,
        errorMessage: 'Долгота не может быть больше 180'
      };
    }
    if (Number(value[2]) < -180) {
      return {
        result: false,
        errorMessage: 'Долгота не может быть меньше -180'
      };
    }
    return {
      result: true,
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}
;// CONCATENATED MODULE: ./src/js/Widget.js


class Widget {
  constructor(container) {
    this.container = container;
    this.popup = new Popup(container);
    this.validator = new Validator();
    this.message = null;
    this.form = null;
    this.list = null;
  }
  drawUI() {
    this.container.innerHTML = `<div class='list-message'></div>
       <form class='form'>
       <input type='text' placeholder='Введите ваше сообщение' class='input-message'></input>
       </form>
        `;
    this.form = this.container.querySelector('.form');
    this.list = this.container.querySelector('.list-message');
    this.message = this.container.querySelector('.input-message');
  }
  init() {
    this.submitMessage();
    this.popup.init();
    this.clickBtnOkay();
  }
  submitMessage() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.findStateUser();
    });
  }
  showMessage() {
    const date = new Date();
    this.listMessage = document.createElement('div');
    this.listMessage.classList.add('message');
    this.listMessage.innerHTML = `<span class='date'>${date.toLocaleTimeString()} ${date.toLocaleDateString()}</span>
      <p class='text'>${this.message.value}</p>
      <div class='coordinate'>
      <span class='position-img'></span>
      <span class='position'>${this.latitude}, ${this.longitude}</span>
      </div>

      `;
    this.message.value = '';
    this.position = this.listMessage.querySelector('.position');
    this.list.append(this.listMessage);
  }
  successPosition(data) {
    const {
      latitude,
      longitude
    } = data.coords;
    this.latitude = latitude;
    this.longitude = longitude;
    this.showMessage();
  }
  errorPosition() {
    this.popup.addPopUpContainer();
  }
  validInputCoord(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.showMessage();
    this.popup.removePopUpContainer();
  }
  findStateUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successPosition.bind(this), this.errorPosition.bind(this));
    } else this.errorPosition();
  }
  getAmountInput() {
    const parseInput = this.popup.input.value.match(/(-?\d+)/gm);
    const checkedInput = this.validator.getCheckValue(parseInput);
    if (checkedInput.result) {
      this.validInputCoord(checkedInput.latitude, checkedInput.longitude);
      this.popup.form.reset();
      this.form.reset();
    } else {
      this.popup.showErrorMessage(checkedInput.errorMessage);
      this.form.reset();
    }
  }
  clickBtnOkay() {
    this.popup.form.addEventListener('submit', e => {
      e.preventDefault();
      this.getAmountInput();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/App.js

const container = document.querySelector('.container');
const widget = new Widget(container);
widget.drawUI();
widget.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;