import { basicSetup } from "codemirror"
import { EditorView, keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"

import { h } from "@strix/std";
import { on } from "@strix/attr";

import { attrGen } from "@strix/macro";

const on = ({
	toString() {
		return Symbol("abc");
	},

	load: {
		toString() {
			return Symbol("load");
		}
	}
})

const Main = () => {
	return h`
		<div! ${{
			[on.load]({ target }) {
				new EditorView({
					doc,
					extensions: [
						basicSetup,
						keymap.of([indentWithTab]),
						javascript()
					],
					parent: target
				});
			}
		}}/>
	`;
}

export default Main;