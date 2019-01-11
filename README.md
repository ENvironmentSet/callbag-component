# callbag-component

callbag-component is wrapper of Custom element 1.0 API.

Provides **reactive custom element** via callbag

## API

### Component

#### component(intent$, model$, view$, [preloadedModel])

| Arguments | Description |
|-----------|-------------|
| intent$ | takes DOM element(connected component). returns source of intent |
| model$ | takes source of intent, previous model(when initialize component, this value will be undefined). returns source of model |
| view$ | takes source of model. returns source of DOM Node, which will replace custom element's children |

```js
import { component } from 'callbag-component';
import fromEvent from 'callbag-from-event';

const myButton = component(
  element => fromEvent(element, 'click'),
  intent$ => (prevModel = 0) => (start, sink) => {
    if (start !== 0) return;
    let unmountHander;

    intent$(0, (t, d) => {
      if (t === 0) unmountHander = d;
      else sink(1, prevModel + 1);
    });
    sink(0, unmountHander);
    sink(1, prevModel);
  },
  model$ => (start, sink) => {
    if (start !== 0) return;
    let unmountHander;

    model$(0, (t, d) => {
      if (t === 0) unmountHander = d;
      else {
        const textNode = document.createTextNode(`count: ${d}`);

        sink(1, textNode);
      }
    });
    sink(0, unmountHander);
  },
);
```