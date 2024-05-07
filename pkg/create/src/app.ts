import prompts from "prompts";

import {
	lightRed,
	blue,
	lightYellow,
	cyan,
	bgBlue,
	bgLightYellow,

	black,
	white,

	bold,
	italic
} from "kolorist"

const requests = [
	{
		type: "text",
		name: "name",
		message: "Project name",
		validate: ({ length }) => length? true : italic(lightRed("Project name must be over 1 characters long"))
	},
	{
		type: "select",
		name: "lang",
		message: "Language",
		choices: [
			{ title: bgLightYellow(black("JavaScript")), value: "js" },
			{ title: bgBlue("TypeScript"), value: "ts" },
			{ title: bold(lightYellow("JSX")), value: "jsx" },
			{ title: bold(blue("TSX")), value: "tsx" },
		]
	}
]

const project_name = await prompts(requests);

console.log(project_name)