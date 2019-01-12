# callbag-component

callbag-component is wrapper of Custom element 1.0 API.

Provides **reactive custom element** via callbag

## API

### Component

#### component(intent$, model$, view$)

| Arguments | Description |
|-----------|-------------|
| intent$ | takes DOM element(connected component). returns source of intent |
| model$ | takes source of intent, previous model(when initialize component, this value will be undefined). returns source of model |
| view$ | takes source of model. returns source of DOM Node, which will replace custom element's children |

Example: 

```js
import { component, fromIntent } from 'callbag-component';
import fromEvent from 'callbag-from-event';
import map from 'callbag-map';

const Counter = component(
  element => fromEvent(element, 'click'),
  fromIntent(prev => prev + 1, 0),
  map(count => document.createTextNode(`count: ${count}`)),
);
```

#### fromIntent(reducer, preloadedModel)

| Arguments | Description |
|-----------|-------------|
| reducer | takes lastly calculated model and lastly produced intent, returns new model |
| preloadedModel | initial model |

```js
import { component, fromIntent } from 'callbag-component';
import fromEvent from 'callbag-from-event';
import map from 'callbag-map';

const Counter = component(
  element => fromEvent(element, 'click'),
  fromIntent(prev => prev + 1, 0),
  map(count => document.createTextNode(`count: ${count}`)),
);
```
