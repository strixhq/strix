import { $, h as html } from "@strix/std"
import { on, href } from "@strix/attr"

const testData = {
	"/test/1"(thisWindowProxy) {
		const clickTarget = thisWindowProxy.document.querySelector("#target");
		clickTarget.click()
		return thisWindowProxy.document.querySelector("#result").textContent == "1"
	}
}

const execAll = () => {
	const testerWP = open("about:blank", "_blank")
}

export default html`
	<h1>Strix tester</h1>
	<button ${{ [on.click]: () => {
		const testerWP = open("about:blank", "_blank")

	} }}>
		Execute all tests
	</button>
`;