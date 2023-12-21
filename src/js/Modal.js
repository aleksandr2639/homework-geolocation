export default class Modal {
    constructor(container) {
      this.container = container;
      this.popup = null;
    }
  
    static modalUI() {
      return `
          <div class="popup-container">
              <div class="popup">
                <h3 class="popup-title">Что-то пошло не так</h3>
                <p class="popup-description">К сожалению, нам не удалось определить ваше местоположение,
                пожалуйста, дайте разрешение на использование геолокации, либо введите коррдинаты вручную.</p>
                <label for="name">Широта и долгота через запятую</label>
                <input id="name" class="input">
                <div class="buttons">
                  <button class="button button-cancel">Отмена</button>
                  <button class="button button-okay">Ок</button>
                </div>
          </div>`;
    }
  
    insertToDOM(html) {
      this.container.insertAdjacentHTML('afterend', html);
      this.popup = document.querySelector('.pop-up-container');
    }
  
    addPopUpContainer() {
      this.popup.classList.add('open');
    }
  
    removwPopUpContainer() {
      this.popup.classList.remove('open');
    }
  }