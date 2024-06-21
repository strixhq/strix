const {
	std: { h, $ },
	attribute: { on, prop, css, ref }
} = await import("https://esm.sh/jsr/@strix/start")

const click = $((value, ref) => {
	ref.addEventListner("click", value, { passive: true })
})

const ondev = Object.assign($((value, ref) => {
	
}), {

})

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

	const input = $("").open();

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

Hello; Counter; Props; Insert; Binding; CanvasApp;

// UI = f(state);