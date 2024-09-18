import { text, select } from "npm:@clack/prompts@0.7.0";
import { existsSync, copy } from "jsr:@std/fs@1.0.3";
// import { UntarStream } from "jsr:@std/tar@0.1.0"
// import { dirname, normalize } from "jsr:@std/path@1.0.6";
// import copy from "npm:recursive-copy@2.0.14"
// import { fromFileUrl } from "@std/path/posix/from-file-url";

console.log(String.raw
`  ______    __              __          
 /      \  |  \            |  \         
|  ▓▓▓▓▓▓\_| ▓▓_    ______  \▓▓__    __ 
| ▓▓___\▓▓   ▓▓ \  /      \|  \  \  /  \
 \▓▓    \ \▓▓▓▓▓▓ |  ▓▓▓▓▓▓\ ▓▓\▓▓\/  ▓▓
 _\▓▓▓▓▓▓\ | ▓▓ __| ▓▓   \▓▓ ▓▓ >▓▓  ▓▓ 
|  \__| ▓▓ | ▓▓|  \ ▓▓     | ▓▓/  ▓▓▓▓\ 
 \▓▓    ▓▓  \▓▓  ▓▓ ▓▓     | ▓▓  ▓▓ \▓▓\
  \▓▓▓▓▓▓    \▓▓▓▓ \▓▓      \▓▓\▓▓   \▓▓`);

const
	defaultProjectName = ((nameBuffer) => {
		const
			[first, second] = [
				[
					"adorable", "blazing", "crazy", "domestic", "exciting", "fancy", "gloroious", "humanitic", "intelligent", "jealousy", "luminous", "magnificent", "numerical", "obvious", "precious", "quiet"
				],
				[
					"apple", "beast", "chalk", "donkey", "eagle", "folk", "gorilla", "harp"
				]
			],
			[firstLength, secondLength] = [first.length, second.length]
		;

		while(
			existsSync(nameBuffer = `strix-${
				first[Math.floor(Math.random() * firstLength)]
			}-${
				second[Math.floor(Math.random() * secondLength)]
			}-app`)
		) {};

		return nameBuffer
	})(),

	projectConfig = {
		name: await text({
			message: '🦉 < Enter Project Name:',
			placeholder: defaultProjectName,
			validate: (value) => 
				existsSync(value)
				? '🦉 < The directory has same name is already exists, try again.'
				: undefined,
		}),
		type: await select({
			message: '🦉 < Enter Project Name:',
			options: [
				{ value: "client", label: "Client" },
				{ value: "server", label: "Server" },
			]
		}),
	},

	definiteProjectName = projectConfig.name ? projectConfig.name : defaultProjectName
;


const initDir = async (folderName, structure) => {
	await Deno.mkdir(folderName);
	for(const index in structure) {
		const dir = `${folderName}/${index}`;
		switch(typeof structure[index]) {
			case "object": {
				await initDir(dir, structure[index]);
				break;
			};
			case "string": {
				await Deno.writeTextFile(dir, structure[index]);
				break;
			};
		}
	}
}

await initDir(definiteProjectName, {
	src: {
		"App.js": `import { $, h as html } from "@strix/std"
import { on } from "@strix/attr"

import { buttonClass } from "./style.js";

export function App() {

	const count = $(0);

	return html\`
		<h1>Count is \${count}</h1>
		<button \${{ [on.click]: () => count.$++, ...buttonClass }}>
			Increment
		</button>
	\`
}`,

		"main.js": `import { createElement } from "@strix/client"
import { App } from "./App.js"

document.body.append(...createElement(App()));`,

		"style.js": `import { css } from "@strix/attr";

export const buttonClass = {
	[css]: {
		color: "white",
		backgroundColor: "black",
	}
}`,
	},
	"deno.json": `{
	"tasks": {
		"install": "deno run -A npm:jsr add @strix/std@latest @strix/attr@latest @strix/client@latest",
		"start": "deno run -A npm:vite@latest"
	}
}`,
	"index.html": `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<script type="module" src="./src/main.js"></script>
</head>
</html>`
})

console.log(
`Done. now, run these following commands:

  cd ${definiteProjectName}
  deno task install
  deno task start 
`)

Deno.exit(0);