import { basicSetup } from "codemirror"
import { EditorView, keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"

import { h } from "@strix/std";
import { on } from "@strix/attr";

import { attrGen } from "@strix/macro";

export default h`
	<div ${{ [layout]: { vertical: [1, 1] } }}>
		<div ${{
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
	</div>
`;;