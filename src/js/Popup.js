export default class Popup {
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
    this.input.addEventListener('input', (e) => {
      e.preventDefault();
      this.hideErrorMessage();
    });
  }

  clickBtnCancel() {
    this.btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      this.removePopUpContainer();
      this.hideErrorMessage();
      this.form.reset();
    });
  }
}
