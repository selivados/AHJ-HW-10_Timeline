/* eslint-disable no-alert */
export default class GeoModal {
  constructor(container) {
    this.container = container;
  }

  drawModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <form class="modal-form">
        <p class="modal-message">Что-то пошло не так</p>
        <p class="modal-message">К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.</p>
        <p class="modal-message">Широта и долгота через запятую (51.50851, -0.12572)</p>
        <input class="modal-input" type="text">
        <div class="modal-control">
          <button class="button ok-button" type="submit">Ок</button>
          <button class="button cancel-button" type="button">Отмена</button>
        </div>
      </form>`;

    this.container.appendChild(this.modal);

    this.form = this.modal.querySelector('.modal-form');
    this.input = this.form.querySelector('.modal-input');
    this.input.focus();
    this.cancelButton = this.form.querySelector('.cancel-button');
  }

  removeModal() {
    this.container.removeChild(this.modal);
  }

  static validate(str) {
    const regex = /^\[?-?\d{1,2}\.\d{5,},\s?-?\d{1,3}\.\d{5,}\]?$/;

    if (regex.test(str)) {
      const coordsStr = str.replace(/[\s[\]]/g, '');
      const data = coordsStr.split(',');

      const latitude = parseFloat(data[0]);
      const longitude = parseFloat(data[1]);

      return { latitude, longitude };
    }

    return false;
  }

  init() {
    return new Promise((resolve) => {
      this.drawModal();

      this.form.addEventListener('submit', (event) => {
        event.preventDefault();

        const { value } = this.input;

        if (value === '') return;

        const result = GeoModal.validate(value);

        if (!result) {
          alert('Введены некорректные данные');
          return;
        }

        this.removeModal();
        resolve(result);
      });

      this.cancelButton.addEventListener('click', (event) => {
        event.preventDefault();

        this.removeModal();
        document.querySelector('.input').focus();
      });
    });
  }
}
