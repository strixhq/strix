<h1>Strix 🦉</h1>

![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/strix)
![GitHub License](https://img.shields.io/github/license/ihasq/strix)

<!-- ![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh) -->

```javascript
import { $, h as html, on } from '@strix/std';
import { createElement } from '@strix/client';


function Counter() {

    const count = $(0);

    return html`
        <h1>${count}</h1>
        <button ${{ [on.click]: () => $[count]++ }}>
            Increment
        </button>
    `;
}


document.body.append(...createElement(App()));
```

**Strix** is a selfish library to provide some weirder, but simpler ways to building web interface.\
Visit [strix.sh](https://strix.sh) for more infomation.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-vuuc9s?file=counter.js)

### Releases

|                                            | Version                                                                                                                                              | Exports                                                                                                                                                                                   | Description      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **[std](https://jsr.io/@strix/std)**       | [![JSR Version](https://img.shields.io/jsr/v/%40strix/std?logo=jsr&labelColor=%23083344&color=%23F7DF1E&label=%20)](https://jsr.io/@strix/std)       | **[`h`](https://jsr.io/@strix/std/doc/~/h)** **[`$`](https://jsr.io/@ihasq/esptr/doc/~/$)** **[`on`](https://jsr.io/@strix/std/doc/~/on)** **[`at`](https://jsr.io/@strix/std/doc/~/at)** | Standard Library |
| **[client](https://jsr.io/@strix/client)** | [![JSR Version](https://img.shields.io/jsr/v/%40strix/client?logo=jsr&labelColor=%23083344&color=%23F7DF1E&label=%20)](https://jsr.io/@strix/client) | **[`createElement`](https://jsr.io/@strix/client/doc/~/createElement)**                                                                                                                   | Client Modules   |

### Installation

```sh
npx jsr add @strix/std@0.0.17 @strix/client@0.0.8
```

![badge](./page/badge.svg)

### Programmable Attributes

```javascript
import { $, h as html } from '@strix/std';

const onDoubleClick = $((callbackFn, ref) => {
    ref.addEventListener('dblclick', callbackFn, { passive: true });
});

function App() {
    return html`
        <textarea ${{ [onDoubleClick]: ({ target: { value } }) => console.log(value) }}>
            Doubleclick me!
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

<!-- ### Directories

| directory          | about             |
| ------------------ | ----------------- |
| **[mod](./mod)**   | Modules           |
| **[pkg](./pkg)**   | Packages          |
| **[kit](./kit)**   | Developnent Kits  |
| **[web](./web)**   | Publications      |
| **[repl](./repl)** | Playground REPL   |

### Packages

| package                          | about                      | exports                     |
| -------------------------------- | -------------------------- | --------------------------- |
| **[std](./pkg/std)**             | Strix standard library     | `h`, `$`, `on`, `css`, `at` |
| **[write](./pkg/write)**         | Client-side HTML Writer    | `write`                     |
| **[define](./pkg/define)**       | Defining Web Components    | `define`                    |
| **[layout](./pkg/layout)**       | Layout manager             | `layout`                    |
| **[nitro](./pkg/nitro)**         | Design systems             | `nitro`                     |
| **[material3](./pkg/material3)** | Material Design 3 port     | `m3`                        |
| **[md](./pkg/md)**               | Markdown-to-HTML Plugin    | `md`                        |
| **[react](./pkg/react)**         | React compatibility hook   | `React`                     |

### SDK

| project                        | about                      |
| ------------------------------ | -------------------------- |
| **[Trixel](./sdk/trixel)**     | Fullstack Strix Framework  |
| **[Create](./sdk/create)**     | Project template generator |
| **[Analyzer](./sdk/analyzer)** | VSCode analyzer            |

### Modules

| module                      | about                     |
| --------------------------- | ------------------------- |
| **[html](./mod/html.js)**   | HTML template parser      |
| **[attr](./mod/attr.js)**   | Attribute template parser |
| **[event](./mod/event.js)** | Event router              |


#### CDN via ESM.SH

```javascript
import html from 'https://esm.sh/jsr/@strix/html';
```
```javascript
const html = await import('https://esm.sh/jsr/@strix/html');
```

#### Add Packages (for Pros)

```sh
npx jsr run @strix/create
```
```sh
deno add @strix/html
```

### Build From Source

```sh
git clone https://github.com/ihasq/strix
deno task build
```


### Usage

```javascript
import { html, $ } from "@strix/std";
import { on } from "@strix/attr";

function Count() {

    const count = $(0);

    const buttonText = $('Hover me!');

    return html`
        <p>You clicked ${count} times</p>
        <button ${{
            [sel`:hover`]() {
                $[buttonText] = "Click me!"
            },
            [on.click]() {
                $[count]++
            }
        }}>
            ${buttonText}
        </button>
    `;
};

export default Count;
```

```html
<body src="./main.js" onload='
    import("https://strix.sh/write").then(write => write(this, import(this.src)))
'></body>
```

```javascript
function Todo() {

    const todoArray = [];

    const TodoRow = ({ todoContent, swapRow, deleteRow }) => {

        let isEditable = false;
        let isDone = false;

        return () => html`
            <li
                contenteditable=${isEditable? 'plaintext-only' : undefined}
                @input=${async ({ target }) => todoData = (await target).data}
                @blur=${() => isEditable = false}
                *text-decoration=${isDone? 'line-through' : 'none'}
                *font-style=${isDone? 'italic' : 'normal'}
            >
                ${todoContent}
            </li>
            <button @click=${() => isEditable = true}>edit</button>
            <button @click=${() => isDone = true}>done</button>
            <button @click=${() => deleteRow()}>delete</button>
            <button @click=${() => swapRow(1)}>swap above</button>
            <button @click=${() => swapRow(-1)}>swap below</button>
        `
    }

    return html`
        <ul>${todoArray}</ul>
        <input @@keydown.Enter=${({ target }) => {
            const newRow = html.new`
                <div
                    *width=100%
                    @dragover=${({ target }) => {
                    }}
                ></div>
                <${TodoRow} ${{
                    [draggable]: true,
                    todoContent: target.value,
                    swapRow(direction) {
                        const i = todoArray.indexOf(newRow);
                        [todoArray[i], todoArray[i + direction]] = [todoArray[i + direction],todoArray[i]];
                    },
                    deleteRow() {
                        delete todoArray[todoArray.indexOf(newRow)]
                    }
                }} />
            `;
            todoArray.push(newRow);
            target.value = "";
        }} />
    `
}
```

```javascript
function Transition() {

    const colorNum = $(0);

    return html`
        <label ${{
            [css.color]: colorNum.to(0xFFFFFF, 1000, true).into(x => `#${parseInt(x, 16).padStart(6, "0")}`)
        }}>
            Gradient!
        </label>
    `
}
```

```javascript
function Parent() {
    return html`
        ${Child({ someProp: "hi" })}
    `;
}

function Child({ someProp }) {
    return html`
        <label>${someProp}</label>
    `;
}
```

```javascript
const C2DApp = html`
    <canvas ${{
        [on.load]({ target: canvas }) {
            const ctx = canvas.getContext('2d');
            // ...
        }
    }}></canvas>
`;
```

```javascript
import { nitro } from 'https://esm.sh/strix-nitro';
// Nitro Design - The Design System By Strix

function StyleImport() {
    return html`
        <button ${{ nitro }}>I am themed by Nitro Design!</button>
    `;
};
```


```javascript
import { center } from '@strix/layout';

function Centered() {
    return html`
        <div ${{ [center]: true }}>
            I am a centered div!
        </div>
    `
}
```

```javascript
import { react } from 'strix-react';

import * as React from 'react@latest';
import { Button } from '@shadcn/ui/components/ui/button';

react.use(React);

const ReactEmbedded = () => () => html`
    <${Button} ${react}>I am the Button from @shadcn/ui in Strix!</${Button}>
`;
```

```jsx
const withJsxImportSource = () => {
    let count = 0;
    return () => (
        <div>{count}</div>
        <button @click={() => count++}></button>
    );
}
```

```javascript
const primitive = html`<div>Hi</div>`;

const samePrimitive = primitive;
alert(primitive === samePrimitive); // true

const regeneratedPrimitive = primitive.new();
alert(primitive === regeneratedPrimitive); // false

const anotherPrimitive = html`<div>Hi</div>`;
alert(primitive === anotherPrimitive); // false

```

```javascript
html`<input type=text; @input=${({ target: { value } }) => alert(value)} />`
html`<input type=text; @input.target.value=${value => alert(value)} />`
```

```javascript
const animation = async ({ frame }) => {

    let rgbValue = 0;

    for(let i = 0; i < 60; i++) {
        rgbValue++
        await frame(html`
            *background-color=#${rgbValue.toString(16).padStart(6, "0")}
        `);
    }
}

html`<div @click=${animation}>woooaaah</div>`
```

```javascript
const Bidirectional = () => {

    const name = ['JAMES', (newName) => console.log(`Name just changed to ${newName}`)];

    return () => html`
        <input type=text strix.bind=${name} />
        <h1>${name}</h1>
    `
}
```

```javascript

const VCSS = ({ $ }) => {
    return () => html`
        <div *width=100px>
            <div *width=calc(super-width / 2)></div>
        </div>
    `
}
```

### License

Strix is MIT Licensed. -->
