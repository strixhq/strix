# [Strix](https://strix.js.org)

![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![GitHub License](https://img.shields.io/github/license/ihasq/libh)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

---

```javascript
const Counter = () => {
    let count = 0;

    return (h) =>
        h`
        <div>
            <h1>${count}</h1>
            <button @click=${() => count++}>
                Increment
            </button>
        </div>
    `;
};

const { write } = await import('strix-html');

write(document.body, Counter);
```

**Strix** is light-weight JavaScript and TypeScript Web construction helper.\
Visit [strix.js.org](https://strix.js.org) for more infomation.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Packages

| package                            | about                      | exports        |
| ---------------------------------- | -------------------------- | -------------- |
| **strix-[html](./html)**           | HTML in JavaScript library | `html` `write` |
| **strix-[layout](./layout)**       | Layout manager             | `layout`       |
| **strix-[nitro](./nitro)**         | Design systems             | `nitro`        |
| **strix-[material3](./material3)** | Material Design 3 port     | `m3`           |
| **strix-[md](./md)**               | Markdown-to-HTML Plugin    | `md`           |
| **strix-[hx](./hx)**               | High power tools           | `hx`           |
| **strix-[react](./react)**         | React compatibility hook   | `React`        |

### Projects

| project                    | about                      |
| -------------------------- | -------------------------- |
| **[Trixel](./trixel)**     | Fullstack Strix Framework  |
| **[Create](./create)**     | Project template generator |
| **[Analyzer](./analyzer)** | VSCode analyzer            |

### Installation

#### CDN (esm.sh)

```javascript
import { write } from 'https://esm.sh/strix-html';
```

#### NPM

```sh
npm i strix-html
```

### Build From Source

```sh
git clone https://github.com/ihasq/strix
deno task build
```

### Smart Attributes on strix-HTML

```javascript
return () =>
    html`
    <div>
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
        <div .value$input=${inputvalue}>...</div>

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

    </div>
`;

$`#inputWithProp`.get`.value` === $`#inputWithProp`.value; // true
$`button`.get`@click`; // () => console.log('clicked')
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

    return (html) =>
        html`
        <button @click=${() => count++};>${count}</button>
    `;
    // refresh every frame with requestAnimationFrame()
};

const PointerMode = ($) => {
    const { ptr } = $.std; // switching into 'set' mode

    let count = ptr(0);

    return (html) =>
        html`
        <button @click=${() => count.v++}>${count}</button>
    `;
    // refresh when pointer value changed, which reduces unchanged calls (most performant)
};
```

### Usage

```javascript
import { write } from 'strix-html';

const Count = ($) => {
    const { ptr } = $.std;

    const count = ptr(0),
        buttonText = ptr('Hover me!'),
        isHovering = ($) => () => {
            buttonText.v = $.value ? 'Click me!' : 'Hover me!';
        };

    return (html) =>
        html`
        <div>
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
        </div>
    `;
};

write(document.body, Count);
```

```javascript
const Counter = () => {
    let count = 0;

    return (html) =>
        html`
        <button @click=${() => count++}; .count=${count};>
            I got clicked ${count} times!
        </button>
    `;
};

const Main = ($) => {
    $`#counter`.then((counterRef) => {
    });

    return (html) =>
        html`
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

        return (html) =>
            html`
            <div @blur=${() => editableTextnode.close()}>
                <span @blur=${() => editableTextnode.close()}>${editableTextnode}</span>

                <button @click=${() => editableTextnode.open()}>edit</button>
                <button @click=${() => map.hide()}>delete</button>
                <button @click=${() => map.swapAbove()}>swap with above</button>
                <button @click=${() => map.swapBelow()}>swap with below</button>
            </div>
        `;
    };

    return (html) =>
        html`
        <div *background-color=#red; *color=white;>
            <ul>${todoMap}</ul>
            <input #todoInput; type=text; .value=${inputPlaceHolder}/>
            <input type=button; @click=${() => {
            todoMap.push((html) =>
                html`
                    <${TodoRow} .value=${inputPlaceHolder.v}/>
                `
            );
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

    return (html) =>
        html`
        <div>
            <input
                type=text;
                .value=${textValuePtr};
                @keydown=${async () => revText.v = value.split('').reverse().join('')}
            />
            <h2>${revText}</h2>
        </div>
    `;
};
```

```javascript
const C2DApp = ($) => (html) =>
    html`
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
    return (html) =>
        html`
        <div>
            <button ${nitro}>I am themed by Nitro Design!</button>
        </div>
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

const sampleAttrModule = (attr) =>
    attr`
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

    div[${someAttrModule}=${true}] {
        span {
            .amIDeeperChild=${true}
        };
    };

    ::selection {
        *background-color=black; 
    };
`; // psuedo elements are style attributes only

const WithAttributeModule = () => (html) =>
    html`
    <div ${sampleAttrModule}=system;>
        <button></button>
    </div>
`;
```

```javascript
import { center } from 'strix-layout';

const HowToCenterADiv = () => (html) =>
    html`
    <div ${center}>Now I am a centered div!</div>
`;
```

```javascript
import { React } from 'strix-react';
import { Button } from '@shadcn/ui/components/ui/button';

const ReactEmbedded = () => (html) =>
    html`
    <div>
        <${React(Button)}>I am the Button from @shadcn/ui in Strix!</${React(Button)}>
    </div>
`;
```

```javascript
import { hx } from 'strix-hx';

const RunLikeHTMX = () => {
    return (html) =>
        html`
        <div ${hx.get}=/example; ${hx.swap}=afterend;></div>
    `;
};
```

```jsx
const withJsxImportSource = () => {
    return () => (
        <div {hx.get}=/example; {hx.swap}=afterend;></div>
    );
}
```

### License

Strix is MIT Licensed.
