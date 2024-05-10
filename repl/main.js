import html from "https://strix.sh/html"
import { basicSetup } from "codemirror"
import { EditorView, keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"

const doc = `if (true) {
	console.log("okay")
} else {
	console.log("oh no")
}`;

export default html`
	<div! @load=${({ target }) => {
		new EditorView({
			doc,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				javascript()
			],
			parent: target
		});
	}}/>
`;
