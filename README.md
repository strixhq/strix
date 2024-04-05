# [IVE](https://ive.js.org) - Intermediate View Engine

![GitHub Repo stars](https://img.shields.io/github/stars/ihasq/libh)
![npm](https://img.shields.io/npm/dt/libh?logo=stackblitz)

![GitHub License](https://img.shields.io/github/license/ihasq/libh)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/libh)

---

```javascript
const Counter = () => {

    let count = 0;

    return html => html`
        <div>
            <h1>${count}</h1>
            <button @click=${() => count++}>
                Increment
            </button>
        </div>
    `;
}

export default Counter;
```

```html
<div src=./counter.js onload='(await import("https://esm.sh/ive-html")).write(this)'></div>
```

**IVE** is the JavaScript and TypeScript project for empowering the Web construction.
Visit [ive.js.org](https://ive.js.org) for more infomation.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/js-qfh42g?file=index.js)

### Projects

| package | about | exports |
| --- | --- | --- |
| **IVE-[HTML](./html)** | HTML in JavaScript library | ```html``` |
| **IVE-[Layout](./layout)** | Layout manager | ```layout``` |
| **IVE-[Nitro](./nitro)** | Design systems | ```nitro``` |
| **IVE-[Material3](./material3)** | Material Design 3 port | ```m3``` |
| **IVE-[MD](./md)** | Markdown-to-HTML Plugin | ```md``` |
| **IVE-[HX](./hx)** | High power tools | ```hx``` |
| **IVE-[React](./react)** | React compatibility hook | ```React``` |
| **IVE-[Create](./create)** | Project template generator | - |
| **IVE-[Analyzer](./analyzer)** | Typescript analyzer | - |

### Installation

#### CDN (esm.sh)
```javascript
import { write } from 'https://esm.sh/ive-html'
```

#### NPM
```sh
npm i ive-html
```

### Build From Source
```sh
git clone https://github.com/ihasq/ive
deno task build
```

### Smart Attributes on IVE-HTML
```javascript
return html => html`
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
        return { get v() {} }
    }
}
```

### Select Your Writing Mode
```javascript
const FrameMode = $ => {
    let count = 0; // this is a 'frame' mode

    return html => html`
        <button @click=${() => count++};>${count}</button>
    `;
    // refresh every frame with requestAnimationFrame()
}

const PointerMode = $ => {
    const { ptr } = $.std; // switching into 'set' mode
    
    let count = ptr(0);

    return html => html`
        <button @click=${() => count.v++}>${count}</button>
    `;
    // refresh when pointer value changed, which reduces unchanged calls (most performant)
}
```

### Usage
```javascript
import { write } from 'ive-html'

const Count = $ => {
    const { ptr } = $.std;

    const
        count = ptr(0),
        buttonText = ptr('Hover me!'),

        isHovering = $ => () => {
            buttonText.v = $.value? 'Click me!' : 'Hover me!'
        };

    return html => html`
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
}

write(document.body, Count);
```

```javascript
const Counter = () => {

    let count = 0;

    return html => html`
        <button @click=${() => count++}; .count=${count};>
            I got clicked ${count} times!
        </button>
    `;
}

const Main = $ => {
    return html => html`
        <body>
            <p>👇 She got clicked ${$`#counter`.count} times</p>
            <${Counter} #counter/>
            <button @click=${() => $`#counter`.click()};>Bring some more...</button>
        </body>
    `;
}
```

```javascript

const TodoApp = $ => {
    const { ptr } = $.std;

    const inputPlaceholder = ptr('', true);

    const TodoRow = $ => {
        const { ptr } = $.std;

        const editableTextnode = ptr($.value, true); // create contenteditable=plaintext-only

        return html => html`
            <div @blur=${() => editableTextnode.close()}>
                <span @blur=${() => editableTextnode.close()}>${editableTextnode}</span>

                <button @click=${() => editableTextnode.open()}>edit</button>
                <button @click=${() => $.element.remove()}>delete</button>
                <button @click=${() => $.swap('above')}>swap with above</button>
                <button @click=${() => $.swap('below')}>swap with below</button>
            </div>
        `;
    }

    return html => html`
        <div *background-color=#red; *color=white;>
            <ul #todoList></ul>
            <input #todoInput; type=text; value=${inputPlaceHolder}/>
            <input type=button; @click=${() => {
                $`#todoList`.push($ => html => html`
                    <${TodoRow} .value=${inputPlaceHolder.v}/>
                `);
                inputPlaceHolder.v = '';
            }};/>
        </div>
    `;
}
```

```javascript
const ReverseStr = $ => {
    const { ptr } = $.std;

    const
        revText = ptr(''),
        textValuePtr = ptr('', true);

    return html => html`
        <div>
            <input
                type=text;
                .value=${textValuePtr};
                @keydown=${async () => revText.v = value.split('').reverse().join('')}
            />
            <h2>${revText}</h2>
        </div>
    `;
}
```

```javascript
const C2DApp = $ => () => html`
    <canvas @load=${({ target: canvas }) => {
        const ctx = canvas.getContext('2d');
        // ...
    }};></canvas>
`;
```

```javascript
import nitro from 'https://esm.sh/ive-nitro'
// Nitro Design - The Design System By Ive

const StyleImport = () => {
    return html => html`
        <div>
            <button ${nitro}>I am themed by Nitro Design!</button>
        </div>
    `
}
```

```javascript
/*
    $ = {
        value: value from attribute
        element: element reference
    }
*/

const sampleAttrModule = attr => attr`
    *background-color=${attr.value === 'system'
        ? '#000'
        : attr.value === 'dark'
            ? '#fff'
            : '#000'
    }
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

const WithAttributeModule = () => html => html`
    <div ${sampleAttrModule}=system;>
        <button></button>
    </div>
`
```

```javascript
import { center } from 'ive-layout';

const HowToCenterADiv = $ => html => html`
    <div ${center}>Now I am a centered div!</div>
`;
```

```javascript
import { React } from 'ive-react';
import { Button } from '@shadcn/ui/components/ui/button'

const ReactEmbedded = () => html => html`
    <div>
        <${React(Button)}>I am the Button from @shadcn/ui in IVE!</${React(Button)}>
    </div>
`;
```

```javascript
import { hx } from 'ive-hx';

const RunLikeHTMX = () => {
    return html => html`
        <div ${hx.get}=/example; ${hx.swap}=afterend;></div>
    `;
}
```

### License
IVE is MIT Licensed.