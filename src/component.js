import pipe from 'callbag-pipe';

export default function component(intentFactory, modelFactory, viewFactory) {
  class ReactiveElement extends HTMLElement {
    constructor() {
      super();
      this._renderer = pipe(
        intentFactory(this),
        modelFactory,
        viewFactory,
      );
    }

    connectedCallback() {
      const renderer = this._renderer;

      renderer(0, (t, d) => {
        if (t === 0) this.disconnectedCallback = () => d(2);
        if (t === 1) this.render(d);
      });
    }

    disconnectedCallback() {
      console.error('Component is disconnected before it render something.');
    }

    render(children) {
      while (this.firstChild) this.removeChild(this.firstChild);
      this.appendChild(children);
    }
  }

  return ReactiveElement;
};