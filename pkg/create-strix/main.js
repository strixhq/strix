import * as prompts from '@clack/prompts';
import * as fs from "node:fs";

console.log("\n🦉 \x1b[01mWelcome to Strix!\x1b[0m 🦉")

const name = await prompts.text({
	message: '🦉💬 PROJECT NAME:',
	placeholder: 'my-strix-project', // デフォルト値
	validate(value) {
		// バリデーション
		if(fs.existsSync(`./${value}`)) {
			return `The directory named ${value} already exists`
		}
	},
});

const language = await prompts.select({
	message: '🦉💬 LANGUAGE',
	options: [
		{ value: 'JS', label: "\x1b[01;93mJavaScript\x1b[0m" },
		{ value: 'TS', label: "\x1b[01;94mTypeScript\x1b[0m" },
		{ value: 'JS', label: "\x1b[01;93mJSX\x1b[0m", hint: "experimental" },
		{ value: 'TS', label: "\x1b[01;94mTSX\x1b[0m", hint: "experimental" },
	],
});

fs.mkdirSync(`./${name}`);
fs.mkdirSync(`./${name}/src`);
fs.writeFileSync(`./${name}/src/main.js`,
`import { h as html, $, on } from "@strix/std";

function App() {

  const count = $(0);

  return html\`
    <h1>\${count}</h1>
    <button \${{ [on.click]: () => $[count]++ }}>
      Increment
    </button>
  \`;
}

export default App;
`);