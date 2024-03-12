import GeoModal from './GeoModal';

export default class Timeline {
  constructor(container) {
    this.container = container;

    this.addPost = this.addPost.bind(this);
  }

  init() {
    this.drawTimeline();
    this.registerEvents();
  }

  drawTimeline() {
    this.form = document.createElement('form');
    this.form.classList.add('timeline-form');
    this.form.innerHTML = `
      <div class="scroll-box"></div>
      <div class="timeline-area"></div>
      <div class="input-area">
        <div class="input-block">
          <input class="input" type="text">
          <div class="microphone"></div>
          <div class="videocamera"></div>
        </div>
      </div>`;

    this.container.appendChild(this.form);

    this.timelineArea = this.form.querySelector('.timeline-area');
    this.input = this.form.querySelector('.input');
  }

  registerEvents() {
    this.form.addEventListener('submit', this.addPost);
  }

  addPost(event) {
    event.preventDefault();

    const { value } = this.input;

    if (value === '') return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords;

        this.drawPost(value, latitude, longitude);
      }, async () => {
        const modal = new GeoModal(document.body);
        const data = await modal.init();
        const { latitude, longitude } = data;

        this.drawPost(value, latitude, longitude);
      }, { enableHighAccuracy: true });
    }
  }

  drawPost(title, latitude, longitude) {
    const postHTML = `
      <div class="post">
        <div class="post-mark"></div>
        <div class="post-block">
          <div class="post-content">
            <p class="post-title">${title}</p>
            <div class="post-info">
              <p class="post-geo">[${latitude}, ${longitude}]</p>
              <p class="post-eye">👁</p>
            </div>
          </div>
          <p class="post-created">${Timeline.formatDate(new Date().getTime())}</p>
        </div>
      </div>`;

    this.timelineArea.insertAdjacentHTML('afterbegin', postHTML);
    this.input.value = '';
  }

  static formatDate(date) {
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    });

    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric',
    });

    const formatedDate = `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;

    return formatedDate;
  }
}
