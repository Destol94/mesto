export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }
  renderer(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
  addItem(elem) {
    this._container.prepend(elem);
  }
}