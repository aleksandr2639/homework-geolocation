export default class Controller {
    constructor(widget){
      this.widget = widget;
      this.listMessage = null;
    }

    build() {
        this.widget.drawUI();
        this.submitMessage();
    }

    submitMessage() {
        this.widget.form.addEventListener('submit', (e) =>{
            e.preventDefault();
            this.showMessage();
            console.log(this.widget.message.value)
        })
    }

    showMessage() {
        const date = new Date();
        this.listMessage = document.createElement('div');
        this.listMessage.classList.add('message');
        this.listMessage.innerHTML = `<span class='date'>${date.toLocaleTimeString()} ${date.toLocaleDateString()}</span>
        <p class='text'>${this.widget.message.value}</p>
        <span class='position'></span>
        `
        this.widget.message.value = ''
        this.widget.list.append(this.listMessage)
    }
}