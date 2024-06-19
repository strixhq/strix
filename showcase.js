import { h, $ } from "@strix/std";
import { on, prop, css, ref } from "@strix/attr";
const h = (a, ...b) => [a, b]; 

const Hello = () => h`
	<label>Hello world!</label>
`

const Counter = () => {

	const count = $(0);

	return h`
		<h1>${count}</h1>
		<button ${{ [on.click]: () => $[count]++ }}>
			Increment
		</button>
	`
}

const Props = ({ labelColor }) => {

	console.log(labelColor.permission) // ["read"]

	return h`
		<label ${{ [css.color]: labelColor }}></label>
	`
}

const Insert = () => h`
	<${Hello} />
`;

const Binding = () => {

	const input = $("", { open: true });

	return h`
		<input ${{
			type: "text",
			[prop.value]: input
		}}/>
	`
}

const CanvasApp = () => {

	const canvasRef = {};

	return h`
		<canvas ${{ [ref]: canvasRef }}></canvas>
	`.then(() => {

		canvasRef.getContext("2d");

	})
}

Hello; Counter; Props; Insert; Binding;

// UI = f(state);