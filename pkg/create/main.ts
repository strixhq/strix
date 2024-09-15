import { text } from "npm:@clack/prompts@0.7.0";
import { existsSync, copy } from "jsr:@std/fs@1.0.3";
// import { copy } from "@std/fs"
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
	defaultProjectName = (() => {
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

		let nameBuffer;

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
	},

	definiteProjectName = projectConfig.name ? projectConfig.name : defaultProjectName
;

await copy(new URL("template-javascript", import.meta.url).pathname, definiteProjectName);

console.log(
`Done. now, run these following commands:

  cd ${definiteProjectName}
  deno task install
  deno task start 
`)

Deno.exit(0);