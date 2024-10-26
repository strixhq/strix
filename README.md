<h1>Strix 🦉</h1>

![GitHub Repo stars](https://img.shields.io/github/stars/strixhq/strix)
![GitHub License](https://img.shields.io/github/license/strixhq/strix)\
![strix std JSR Version](https://img.shields.io/jsr/v/%40strix/std?logo=jsr&label=%40strix%2Fstd&labelColor=%2309303F&color=%23EDD82A&link=https%3A%2F%2Fjsr.io%2F%40strix%2Fstd)
![strix attr JSR Version](https://img.shields.io/jsr/v/%40strix/attr?logo=jsr&label=%40strix%2Fattr&labelColor=%2309303F&color=%23EDD82A&link=https%3A%2F%2Fjsr.io%2F%40strix%2Fattr)
![JSR Version](https://img.shields.io/jsr/v/%40strix/client?logo=jsr&label=%40strix%2Fclient&labelColor=%2309303F&color=%23EDD82A&link=https%3A%2F%2Fjsr.io%2F%40strix%2Fclient)




<!-- ![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh) -->

```javascript
import { $, h as html } from '@strix/std';
import { on } from '@strix/attr';


export default function() {

    const count = $(0);

    return html`
        <h1>${count}</h1>
        <button ${{ [on.click]: () => count.$++ }}>
            Increment
        </button>
    `;
}
```

**Strix** is a ~3KB selfish library to provide some weirder, but simpler ways to building web interface.\
Visit [strix.sh](https://strix.sh) for more infomation.

### Installation

On Deno (version 1.46 or newer)
```sh
deno -WER https://strix.sh
```

### Demo
Working demo is out now at **[StackBlitz](https://stackblitz.com/edit/web-platform-nqktqc?devToolsHeight=33&file=counter.js)** and **[Codepen](https://codepen.io/ihasq/pen/wvLRzyd?editors=0011)**.

### Releases

|                                                                   | Version                                                                                                                                              | Exports                                                                                                                                                                                   | Description      |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **[std](https://github.com/ihasq/strix/tree/main/pkg/std)**       | [![JSR Version](https://img.shields.io/jsr/v/%40strix/std?logo=jsr&labelColor=%23083344&color=%23F7DF1E&label=%20)](https://jsr.io/@strix/std)       | **[`h`](https://jsr.io/@strix/std/doc/~/h)** **[`$`](https://jsr.io/@ihasq/esptr/doc/~/$)** | Standard Library |
| **[attr](https://github.com/ihasq/strix/tree/main/pkg/attr)** | [![JSR Version](https://img.shields.io/jsr/v/%40strix/attr?logo=jsr&labelColor=%23083344&color=%23F7DF1E&label=%20)](https://jsr.io/@strix/attr) |**[`on`](https://jsr.io/@strix/attr/doc/~/on)** **[`at`](https://jsr.io/@strix/attr/doc/~/at)** **[`css`](https://jsr.io/@strix/attr/doc/~/css)** | Attribute Modules |
| **[client](https://github.com/ihasq/strix/tree/main/pkg/client)** | [![JSR Version](https://img.shields.io/jsr/v/%40strix/client?logo=jsr&labelColor=%23083344&color=%23F7DF1E&label=%20)](https://jsr.io/@strix/client) | **[`write`](https://jsr.io/@strix/client/doc/~/write)**<br>**[`createElement`](https://jsr.io/@strix/client/doc/~/createElement)**                                                                                                                   | Client Modules   |


![badge](./web/page/badge.svg)

### Components and Fragments
```javascript
// ...

const justFragment = html`
    <label>I am fragment</label>
    <label>with components!</label>
    ${App("double-click me!")}
`;
```

### Styling, Event-listening
```javascript
// ...

import { on, css } from "@strix/attr"

function WithAttributes() {
    return html`
        <button ${{
            [css.color]: "red",
            [on.click]: () => alert("clicked!")
        }}>
            click me...
        </button>
    `
}
```

### Create Class
```javascript
// ...

const mainButton = {
    [css]: {
        backgroundColor: "blue",
        color: "white",
        borderRadius: "2px"
    },
}

function AppWithClass() {

    return html`
        <button ${mainButton}>
            I am main button!
        </button>

        <button ${mainButton} ${{
            [css.color]: "yellow"
        }}>
            and it is overridable!
        </button>
    `
}

```

### Programmable Attributes

```javascript
// ...

const onDoubleClick = $((callbackFn, ref) => {
    ref.addEventListener('dblclick', callbackFn, { passive: true });
});

function App(defaultText) {
    return html`
        <textarea ${{ [onDoubleClick]: ({ target: { value } }) => console.log(value) }}>
            ${defaultText}
        </textarea>
    `;
}
```

### Create Element

```javascript
// ...

import { createElement } from '@strix/client';

document.body.append(...createElement(App()));
```

### Unsafe-Proof
```javascript
const username = "<script>alert(0)</script>";

const temp = html`<label>username is ${username}!</label>`

// username is <script>alert(0)</script>!
```

### License

Strix is MIT Licensed. 