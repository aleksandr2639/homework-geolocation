import Widget from './Widget';
import Controller from './Controller';

const widget = new Widget();
widget.bindToDOM(document.querySelector('.container'));

const controllerApp = new Controller(widget);
controllerApp.build();
