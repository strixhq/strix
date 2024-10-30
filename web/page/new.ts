import{text as p,select as o}from"npm:@clack/prompts@0.7.0";import{existsSync as i}from"jsr:@std/fs@1.0.3";console.log(String.raw`  ______    __              __          
 /      \  |  \            |  \         
|  ▓▓▓▓▓▓\_| ▓▓_    ______  \▓▓__    __ 
| ▓▓___\▓▓   ▓▓ \  /      \|  \  \  /  \
 \▓▓    \ \▓▓▓▓▓▓ |  ▓▓▓▓▓▓\ ▓▓\▓▓\/  ▓▓
 _\▓▓▓▓▓▓\ | ▓▓ __| ▓▓   \▓▓ ▓▓ >▓▓  ▓▓ 
|  \__| ▓▓ | ▓▓|  \ ▓▓     | ▓▓/  ▓▓▓▓\ 
 \▓▓    ▓▓  \▓▓  ▓▓ ▓▓     | ▓▓  ▓▓ \▓▓\
  \▓▓▓▓▓▓    \▓▓▓▓ \▓▓      \▓▓\▓▓   \▓▓`);const s=(t=>{const[e,a]=[["adorable","blazing","crazy","domestic","exciting","fancy","gloroious","humanitic","intelligent","jealousy","luminous","magnificent","numerical","obvious","precious","quiet"],["apple","beast","chalk","donkey","eagle","folk","gorilla","harp"]],[n,m]=[e.length,a.length];for(;i(t=`strix-${e[Math.floor(Math.random()*n)]}-${a[Math.floor(Math.random()*m)]}-app`););return t})(),r={name:await p({message:"\u{1F989} < Enter Project Name:",placeholder:s,validate:t=>i(t)?"\u{1F989} < The directory has same name is already exists, try again.":void 0}),type:await o({message:"\u{1F989} < Select Project Type:",options:[{value:"client",label:"Client"},{value:"server",label:"Server"}]}),lang:await o({message:"\u{1F989} < Select Language:",options:[{value:"js",label:"JavaScript"},{value:"ts",label:"TypeScript"}]})},l=r.name?r.name:s,c=async(t,e)=>{await Deno.mkdir(t);for(const a in e){const n=`${t}/${a}`;switch(typeof e[a]){case"object":{await c(n,e[a]);break}case"string":{await Deno.writeTextFile(n,e[a]);break}}}};await c(l,{src:{"App.js":`import { $, h as html } from "@strix/std"
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
</html>`}),console.log(`Done. now, run these following commands:

  cd ${l}
  deno task install
  deno task start 
`),Deno.exit(0);
