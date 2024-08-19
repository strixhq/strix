const prompts = require('prompts');
const fs = require("node:fs");

(async () => {
	const response = await prompts([
		{
			type: 'text',
			name: 'projectName',
			message: 'Enter your project name'
		}
	]);

	fs.mkdirSync(response.projectName)
})();