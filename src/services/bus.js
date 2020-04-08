export class EventBus {
  constructor() {
    this.bus = document.createElement('events');
  }

  on(event, callback) {
    this.bus.addEventListener(event, callback);
  }

  off(event, callback) {
    this.bus.removeEventListener(event, callback);
  }

  dispatch(event, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent(event, {detail}));
  }
}

export default new EventBus();
