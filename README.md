# [Strix](https://strix.js.org)

![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![GitHub License](https://img.shields.io/github/license/ihasq/libh)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

---

```javascript
import { html, write } from 'https://esm.sh/strix-html';

const Counter = () => {

    let count = 0;

    return () => html`
        <h1>${count}</h1>
        <button @click=${() => count++}>
            Increment
        </button>
    `;
};

write(document.body, Counter);
```

**Strix** is light-weight DOM manipulation helper.\
Visit [strix.js.org](https://strix.js.org) for more infomation.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Directories

| directory          | about             |
| ------------------ | ----------------- |
| **[mod](./mod)**   | Modules           |
| **[pkg](./pkg)**   | Packages          |
| **[sdk](./sdk)**   | Developnent Tools |
| **[docs](./docs)** | Documentation     |

### Packages

| package                                | about                      | exports  |
| -------------------------------------- | -------------------------- | -------- |
| **strix-[html](./pkg/html)**           | HTML in JavaScript library | `write`  |
| **strix-[serve](./pkg/serve)**         | Server-side HTML Renderer  | `serve`  |
| **strix-[define](./pkg/define)**       | Defining Web Components    | `define` |
| **strix-[layout](./pkg/layout)**       | Layout manager             | `layout` |
| **strix-[nitro](./pkg/nitro)**         | Design systems             | `nitro`  |
| **strix-[material3](./pkg/material3)** | Material Design 3 port     | `m3`     |
| **strix-[md](./pkg/md)**               | Markdown-to-HTML Plugin    | `md`     |
| **strix-[hx](./pkg/hx)**               | High power tools           | `hx`     |
| **strix-[react](./pkg/react)**         | React compatibility hook   | `React`  |

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

#### CDN (esm.sh)

```javascript
import { html, write } from 'https://esm.sh/strix-html';
```

### Build From Source

```sh
git clone https://github.com/ihasq/strix
deno task build
```

### Smart Attributes on strix-HTML

```javascript
return () => html`
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

$`#inputWithProp`.get`.value` === $`#inputWithProp`.value; // true
$`button` // ERROR
$`#hasNested`.get`*color`; // 'blue'
```

### Directives

```javascript
$.std = {
    ptr(setup, setCallbackFn, getCallbackFn) {
        /* create pointer */
        return { get v() {} };
    },
};
```

### Select Your Writing Mode

```javascript
const FrameMode = ($) => {
    let count = 0; // this is a 'frame' mode

    return () => html`
        <button @click=${() => count++};>${count}</button>
    `;
    // refresh every frame with requestAnimationFrame()
};

const PointerMode = ($) => {
    const { ptr } = $.std; // switching into 'set' mode

    let count = ptr(0);

    return () => html`
        <button @click=${() => count.v++}>${count}</button>
    `;
    // refresh when pointer value changed, which reduces unchanged calls (most performant)
};
```

### 3 Ways To Make View

```javascript
const HTML = html`
    <div>It works!</div>
`;

const View = () => html`
    <div>It works too!</div>
`;

const Component = () => {
    return () => html`
        <div>Fully working!</div>
    `;
};

write(document.body, html`
    <${HTML} />
    <${View} />
    <${Component} />
`)
```

### Usage

```javascript
import { html, write } from 'strix-html';

const Count = ($) => {
    const { ptr } = $.std;

    const count = ptr(0),
        buttonText = ptr('Hover me!'),
        isHovering = ($) => () => {
            buttonText.v = $.value ? 'Click me!' : 'Hover me!';
        };

    return () => html`
        <p>You clicked ${count} times</p>
        <button
            @click=${() => count.v++};
            ${isHovering}=${false};

            :hover {
                *background-color=red;
                *color=white;
                ${isHovering}=${true};
            }
        >
            ${buttonText}
        </button>
    `;
};

write(document.body, Count);
```

```javascript
const Counter = () => {
    let count = 0;

    return () => html`
        <button @click=${() => count++}; .count=${count};>
            I got clicked ${count} times!
        </button>
    `;
};

const Main = ($) => {
    $`#counter`.then((counterRef) => {
    });

    return () => html`
        <body>
            <p>👇 She got clicked ${$`#counter`.count} times</p>
            <${Counter} #counter/>
            <button @click=${() => $`#counter`.click()};>Bring some more...</button>
        </body>
    `;
};
```

```javascript
const TodoApp = ($) => {
    const { std: { ptr, map } } = $;

    const inputPlaceholder = ptr.new('', true);

    const todoMap = map.new();

    const TodoRow = (todoRowRef) => {
        const { std: { ptr }, map } = todoRowRef;

        const editableTextnode = ptr.new(todoRowRef.value, true); // create contenteditable=plaintext-only

        return () => html`
            <div @blur=${() => editableTextnode.close()}>
                <span @blur=${() => editableTextnode.close()}>${editableTextnode}</span>

                <button @click=${() => editableTextnode.open()}>edit</button>
                <button @click=${() => map.hide()}>delete</button>
                <button @click=${() => map.swapAbove()}>swap with above</button>
                <button @click=${() => map.swapBelow()}>swap with below</button>
            </div>
        `;
    };

    return () => html`
        <div *background-color=#red; *color=white;>
            <ul>${todoMap}</ul>
            <input #todoInput; type=text; .value=${inputPlaceHolder}/>
            <input type=button; @click=${() => {
                todoMap.push(() => html`
                    <${TodoRow} .value=${inputPlaceHolder.v}/>
                `);
                inputPlaceHolder.v = '';
            }};/>
        </div>
    `;
};
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
const C2DApp = ($) => () => html`
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
/*
    $ = {
        value: value from attribute
        element: element reference
    }
*/

import { attr } from 'strix-html';

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
    return () => (
        <Component {hx.get}=/example; {hx.swap}=afterend;></div>
    );
}
```

### License

Strix is MIT Licensed.
