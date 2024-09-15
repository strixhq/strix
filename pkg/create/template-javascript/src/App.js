import { $, h as html } from "@strix/std"
import { on } from "@strix/attr"

import { buttonClass } from "./style.js";

export function App() {

	const count = $(0);

	return html`
		<h1>Count is ${count}</h1>
		<button ${{ [on.click]: () => count.$++, ...buttonClass }}>
			Increment
		</button>
	`
}