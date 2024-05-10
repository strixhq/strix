# [Strix](https://strix.sh)

![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![GitHub License](https://img.shields.io/github/license/ihasq/libh)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

---

```javascript
import html from 'https://strix.sh/html';

const Counter = () => {

    let count = 0;

    return () => html`
        <h1>${count}</h1>
        <button @click=${() => count++}>
            Increment
        </button>
    `;
};

export default Counter;
```

**Strix** is light-weight DOM manipulation helper.\
Visit [strix.sh](https://strix.sh) for more infomation.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Directories

| directory          | about             |
| ------------------ | ----------------- |
| **[mod](./mod)**   | Modules           |
| **[pkg](./pkg)**   | Packages          |
| **[kit](./kit)**   | Developnent Kits  |
| **[web](./web)**   | Publications      |
| **[repl](./repl)** | Playground REPL   |

### Packages

| package                          | about                      | exports         |
| -------------------------------- | -------------------------- | --------------- |
| **[html](./pkg/html)**           | HTML in JavaScript library | `html`          |
| **[write](./pkg/write)**         | Client-side HTML Writer    | `write`         |
| **[define](./pkg/define)**       | Defining Web Components    | `define`        |
| **[set](./pkg/set)**             | Signal-like Hook           | `set`           |
| **[layout](./pkg/layout)**       | Layout manager             | `layout`        |
| **[nitro](./pkg/nitro)**         | Design systems             | `nitro`         |
| **[material3](./pkg/material3)** | Material Design 3 port     | `m3`            |
| **[md](./pkg/md)**               | Markdown-to-HTML Plugin    | `md`            |
| **[react](./pkg/react)**         | React compatibility hook   | `React`         |

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

### Installation

#### CDN

```javascript
import html from 'https://strix.sh/html';
```
```javascript
const html = await import('https://strix.sh/html');
```

#### NPM (HTTPS)

```sh
npm i git+https://github.com/ihasq/strix.git
```

### Build From Source

```sh
git clone https://github.com/ihasq/strix
deno task build
```

### Smart Attributes on strix-HTML

```javascript
html`
    <!-- text -->
    <label>${text}</label>

    <!-- attribute -->
    <iframe src=${formURL}; />

    <!-- identifier (not the id attribute) -->
    <img #mainImgRef/>

    <!-- event handler -->
    <button @click=${() => console.log('clicked')}; />
    <input @@keydown=${() => console.log('cancelled')}; /> <!-- preventDefault() -->

    <!-- style -->
    <h1 *color=${titleColor}></h1>

    <!-- property -->
    <input #inputWithProp type=text; .value=ok; />

    <input type=checkbox; .value=${true}; /> <!-- CORRECT type -->
    <input type=checkbox; .value=true; /> <!-- This is NOT boolean, this is string -->

    <div .someprop.deeper='more deeper'; />

    <!-- embedding component -->
    <${DefinedComponent} my-attribute=1; />

    <!-- custom attribute -->
    <div ${name}=taro></div>
    <div ${alsoWithType}=${true}></div>

    <!-- to child elements -->
    <div .value&input=${inputvalue}>...</div>

    <!-- branching with psuedo class or booleanish -->
    <button *color:hover=red; *color${Date.now() % 2}=blue></button>

    <!-- nesting -->
    <div
        #hasNested

        :hover {
            *color=red;
        };

        ${window.clientHeight >= 100} {
            *color=blue;
        };
    ></div>
`;

```

### 4 Ways To Make View

```javascript
const Instance = new html`
    <div>It works!</div>
`;

const Primitive = html`
    <div>It works!</div>
`;

const Transformer = ({ color }) => html`
    <label *color=${color}>Label with colors!</label>
`

const Component = () => {

    let count = 0;

    return () => html`
        <button @click=${() => {
            count++;
            alert(count);
        }}>Fully working!</button>
    `;
};

write(document.body, html`
    <${Instance} />
    <${Primitive} />
    <${Transformer} .color=red />
    <${Component} />
`);
```

### Usage

```javascript
import html from "https://strix.sh/html"

const Count = () => {

    let count = 0,
        buttonText = 'Hover me!',
        isHovering = () => value => {
            buttonText = value? 'Click me!' : 'Hover me!'
            return html`
                *background-color=red;
                *color=white;
            `;
        };

    return () => html`
        <p>You clicked ${count} times</p>
        <button
            @click=${() => count++};
            ${isHovering}=${false};
            ${isHovering}:hover=${true};
        >
            ${buttonText}
        </button>
    `;
};

export default Count;
```

```html
<body onload='
    import("https://strix.sh/write").then(write => write(this, import(this.src)))
'></body>
```

```javascript
const Todo = () => {

    const todoArray = [];

    const TodoRow = ({ todoContent, swapRow, deleteRow }) => {

        let todoData = todoContent;
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
                ${todoData}
            </li>
            <button @click=${() => isEditable = true}>edit</button>
            <button @click=${() => isDone = true}>done</button>
            <button @click=${() => deleteRow()}>delete</button>

            <button @click=${() => swapRow(1)}>swap above</button>
            <button @click=${() => swapRow(-1)}>swap below</button>
        `
    }

    return () => html`
        <ul>${todoArray}</ul>
        <input @@keydown.Enter=${({ target }) => {
            const newRow = html`
                <div
                    *width=100%
                    @dragover=${({ target }) => {
                    }}
                ></div>
                <${TodoRow}
                    draggable=${true}
                    .todoContent=${target.value}
                    .swapRow=${(direction) => {
                        const i = todoArray.indexOf(newRow);
                        [todoArray[i], todoArray[i + direction]] = [todoArray[i + direction],todoArray[i]];
                    }}
                    .deleteRow=${() => delete todoArray[todoArray.indexOf(newRow)]}
                />
            `;
            todoArray.push(newRow);
            target.value = "";
        }} />
    `
}
```

```javascript
const ReverseStr = ($) => {
    const { ptr } = $.std;

    const revText = ptr(''),
        textValuePtr = ptr('', true);

    return () => html`
        <input
            type=text;
            .value=${textValuePtr};
            @keydown=${async () => revText.v = value.split('').reverse().join('')}
        />
        <h2>${revText}</h2>
    `;
};
```

```javascript
const C2DApp = html`
    <canvas @load=${({ target: canvas }) => {
        const ctx = canvas.getContext('2d');
        // ...
    }};></canvas>
`;
```

```javascript
import nitro from 'https://esm.sh/strix-nitro';
// Nitro Design - The Design System By Strix

const StyleImport = () => {
    return () => html`
        <button ${nitro}>I am themed by Nitro Design!</button>
    `;
};
```

```javascript
const sampleAttrModule = () => attr`
    *background-color=${attr.value === 'system' ? '#000' : attr.value === 'dark' ? '#fff' : '#000'}
    *color=red;
    ${anotherAttrModule}=${true}

    :hover {
        *color=blue;
        @click=${() => alert('I am hovered')}
    };

    button {
        @@click=${() => alert('prevented by parent!')}
    };

    &div[${someAttrModule}=${true}] {
        &span {
            .amIDeeperChild=${true}
        };
    };

    ::selection {
        *background-color=black; 
    };
`; // psuedo elements are style attributes only

const WithAttributeModule = () => () => html`
    <div ${sampleAttrModule}=system;>
        <button></button>
    </div>
`;
```

```javascript
import { center } from 'strix-layout';

const HowToCenterADiv = () => () => html`
    <div ${center}>Now I am a centered div!</div>
`;
```

```javascript
import { React } from 'strix-react';
import { Button } from '@shadcn/ui/components/ui/button';

const ReactEmbedded = () => () => html`
    <${React(Button)}>I am the Button from @shadcn/ui in Strix!</${React(Button)}>
`;
```

```javascript
import { hx } from 'strix-hx';

const RunLikeHTMX = () => {
    return () => html`
        <div ${hx.get}=/example; ${hx.swap}=afterend;></div>
    `;
};
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

### License

Strix is MIT Licensed.