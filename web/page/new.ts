import{text as m,select as p}from"npm:@clack/prompts@0.7.0";import{existsSync as a}from"jsr:@std/fs@1.0.3";console.log(String.raw`  ______    __              __          
 /      \  |  \            |  \         
|  ▓▓▓▓▓▓\_| ▓▓_    ______  \▓▓__    __ 
| ▓▓___\▓▓   ▓▓ \  /      \|  \  \  /  \
 \▓▓    \ \▓▓▓▓▓▓ |  ▓▓▓▓▓▓\ ▓▓\▓▓\/  ▓▓
 _\▓▓▓▓▓▓\ | ▓▓ __| ▓▓   \▓▓ ▓▓ >▓▓  ▓▓ 
|  \__| ▓▓ | ▓▓|  \ ▓▓     | ▓▓/  ▓▓▓▓\ 
 \▓▓    ▓▓  \▓▓  ▓▓ ▓▓     | ▓▓  ▓▓ \▓▓\
  \▓▓▓▓▓▓    \▓▓▓▓ \▓▓      \▓▓\▓▓   \▓▓`);const i=(t=>{const[e,n]=[["adorable","blazing","crazy","domestic","exciting","fancy","gloroious","humanitic","intelligent","jealousy","luminous","magnificent","numerical","obvious","precious","quiet"],["apple","beast","chalk","donkey","eagle","folk","gorilla","harp"]],[o,c]=[e.length,n.length];for(;a(t=`strix-${e[Math.floor(Math.random()*o)]}-${n[Math.floor(Math.random()*c)]}-app`););return t})(),s={name:await m({message:"\u{1F989} < Enter Project Name:",placeholder:i,validate:t=>a(t)?"\u{1F989} < The directory has same name is already exists, try again.":void 0}),type:await p({message:"\u{1F989} < Enter Project Name:",options:[{value:"client",label:"Client"},{value:"server",label:"Server"}]})},r=s.name?s.name:i,l=async(t,e)=>{await Deno.mkdir(t);for(const n in e){const o=`${t}/${n}`;switch(typeof e[n]){case"object":{await l(o,e[n]);break}case"string":{await Deno.writeTextFile(o,e[n]);break}}}};await l(r,{src:{"App.js":`import { $, h as html } from "@strix/std"
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
}`,"main.js":`import { createElement } from "@strix/client"
import { App } from "./App.js"

document.body.append(...createElement(App()));`,"style.js":`import { css } from "@strix/attr";

export const buttonClass = {
	[css]: {
		color: "white",
		backgroundColor: "black",
	}
}`},"deno.json":`{
	"tasks": {
		"install": "deno run -A npm:jsr add @strix/std@latest @strix/attr@latest @strix/client@latest",
		"start": "deno run -A npm:vite@latest"
	}
}`,"index.html":`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<script type="module" src="./src/main.js"><\/script>
</head>
</html>`});console.log(`Done. now, run these following commands:

  cd ${r}
  deno task install
  deno task start 
`),Deno.exit(0);
