import * as prompts from '@clack/prompts';
import * as fs from "node:fs";
import * as process from "node:process"

console.log("\n🦉 \x1b[01mWelcome to Strix!\x1b[0m 🦉");

(async () => {
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
	
	// const language = await prompts.select({
	// 	message: '🦉💬 LANGUAGE:',
	// 	options: [
	// 		{ value: 'js', label: "\x1b[01;93mJavaScript\x1b[0m" },
	// 		{ value: 'ts', label: "\x1b[01;94mTypeScript\x1b[0m" },
	// 	],
	// });
	
	// const template = await prompts.select({
	// 	message: '🦉💬 TEMPLATE USAGE:',
	// 	options: [
	// 		{ value: true, label: "\x1b[01;93mPre-built template\x1b[0m" },
	// 		{ value: false, label: "\x1b[01;94mBlank project\x1b[0m" },
	// 	],
	// });
	
	const __dirname = process.cwd();
	
	fs.mkdirSync(`${__dirname}/${name}`);
	fs.cpSync(`./temp/js`, `${__dirname}/${name}`, { recursive: true });
	fs.writeFileSync(`${__dirname}/${name}/package.json`, `{
		"name": "${name}",
		"version": "0.0.1",
		"scripts": {
			"start": "npx jsr add @strix/std@latest @strix/client@latest && npx vite"
		}
	}`)
	
	console.log(`\n🦉 \x1b[01mDone. now, enter these following commands: \x1b[0m 🦉
  ╭${"─".repeat(name.length + 13)}╮
  │ > cd ${name + "\u0020".repeat(7)}│
  │ > npm start${"\u0020".repeat(1 + name.length)}│
  ╰${"─".repeat(name.length + 13)}╯`)
})()
