// import { h, $ } from "@strix/std";
// import { on, css } from "@strix/attr";
import { hover, autofill, default_psuedo } from "./pkg/psuedo/mod.js";

console.log(hover * default_psuedo)

// const Hello = () => h`
// 	<label>Hello world!</label>
// `

// const Counter = () => {

// 	const count = $(0);

// 	return h`
// 		<h1>${count}</h1>
// 		<button ${{ [on.click]: () => $[count]++ }}>
// 			Increment
// 		</button>
// 	`
// }

// const Props = ({ labelColor }) => {

// 	console.log(labelColor.permission) // ["read"]

// 	return h`
// 		<label ${{ [css.color(hover / autofill)]: labelColor }}></label>
// 	`
// }

// const Insert = () => h`
// 	<${Hello} />
// `

// Hello; Counter; Props; Insert;

// // UI = f(state);