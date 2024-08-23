import { h as html, $, on } from "../pkg/std/mod.js";
import { createElement } from "../pkg/client/mod.js";

function App() {
	const count = $(0);
	return html`
		<h1>${count}</h1>
		<button ${{ [on.click]: () => $[count]++ }}>
			I got clicked ${count} times!
		</button>
	`;
}

document.body.append(...createElement(App()))
