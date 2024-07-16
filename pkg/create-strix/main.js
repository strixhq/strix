const prompts = require('prompts');

const questions = [
	{
		type: 'text',
		name: 'username',
		message: 'Enter your project name'
	}
];

(async () => {
	const response = await prompts(questions);

	// => response => { username, age, about }
})();