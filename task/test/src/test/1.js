import { $, h as html } from "@strix/std";
import { on, at } from "@strix/attr";

const count = $(0);

export default html`
	<h1 ${{ id: "result" }}>${count}</h1>
	<button ${{ [on.click]: () => count.$++, id: "target" }}>
		Increment
	</button>
`