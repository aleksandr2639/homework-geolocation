import Modal from "./Modal";

export default class Widget {
    constructor(container){
        this.container = container;
        this.modal = null;
        this.message = null;
        this.form = null;
        this.list = null;
    }

    bindToDOM(container) {
        if (!(container instanceof HTMLElement)) {
          throw new Error('HTMLElement is not defined');
        }
        this.container = container;
        this.modal = new Modal(container);
      }

    drawUI() {
       this.checkBinding();
       this.modal.insertToDOM(Modal.modalUI());
       this.container.innerHTML =`<div class='list-message'></div>
       <form class='form'>
       <input type='text' placeholder='Введите ваше сообщение' class='textarea-message'></input>
       </form>
        `
        this.form = this.container.querySelector('.form')
        this.list = this.container.querySelector('.list-message');
        this.message = this.container.querySelector('.textarea-message');
    }

    checkBinding() {
        if (this.container === null) {
          throw new Error('GamePlay not bind to DOM');
        }
      }
}