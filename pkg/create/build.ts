import * as esbuild from 'npm:esbuild@0.20.2';
// Import the WASM build on platforms where running subprocesses is not
// permitted, such as Deno Deploy, or when running without `--allow-run`.
// import * as esbuild from "https://deno.land/x/esbuild@0.20.2/wasm.js";

import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@^0.10.3';

const minify = true;

await esbuild.build({
	plugins: [...denoPlugins()],
	entryPoints: ['./main.ts'],
	outfile: './main.dist.js',
	bundle: false,
	minify,
	treeShaking: true,
	format: 'esm',
});