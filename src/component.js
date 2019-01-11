import { pipe } from './utils';

export default function component(intentFactory, modelFactory, viewFactory, preloadedModel) {
  class ReactiveElement extends HTMLElement {
    constructor() {
      const modelInterceptor = modelFactory => (start, sink) => {
        if (start !== 0) return;
        let modelTalkback;
        const synchronizer = (t, d) => {
          if (t === 0) modelTalkback = d;
          if (t === 1 && this._prevModel !== d) {
            this._prevModel = d;
            model$(2);
            model$ = modelFactory(this._prevModel);
            model$(0, synchronizer);
          }
          sink(t, d);
        };
        let model$ = modelFactory(this._prevModel);

        model$(0, synchronizer);
      };
      super();
      this._prevModel = preloadedModel;
      this._renderer = pipe(
        intentFactory(this),
        modelFactory,
        modelInterceptor,
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
      console.error('Component is disconnected it render something.');
    }

    render(children) {
      while (this.firstChild) this.removeChild(this.firstChild);
      this.appendChild(children);
    }
  }

  return ReactiveElement;
};