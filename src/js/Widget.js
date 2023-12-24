import Popup from './Popup';
import Validator from './Validator';

export default class Widget {
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
    this.form.addEventListener('submit', (e) => {
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
    const { latitude, longitude } = data.coords;

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
      navigator.geolocation.getCurrentPosition(
        this.successPosition.bind(this),
        this.errorPosition.bind(this),
      );
    } else this.errorPosition();
  }

  getAmountInput() {
    const parseInput = (this.popup.input.value).match(/(-?\d+)/gm);
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
    this.popup.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.getAmountInput();
    });
  }
}
