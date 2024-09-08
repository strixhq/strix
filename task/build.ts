import * as esbuild from 'npm:esbuild@0.20.2';
// Import the WASM build on platforms where running subprocesses is not
// permitted, such as Deno Deploy, or when running without `--allow-run`.
// import * as esbuild from "https://deno.land/x/esbuild@0.20.2/wasm.js";

import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@^0.10.3';

await esbuild.build({
	plugins: [...denoPlugins()],
	entryPoints: ['./pkg/std/mod.ts'],
	outfile: './dist/std.mod.js',
	bundle: true,
	minify: true,
	format: 'esm',
});

await esbuild.build({
	plugins: [...denoPlugins()],
	entryPoints: ['./pkg/client/mod.ts'],
	outfile: './dist/client.mod.js',
	bundle: true,
	minify: true,
	format: 'esm',
});

await esbuild.build({
	plugins: [...denoPlugins()],
	entryPoints: ['./pkg/attr/mod.ts'],
	outfile: './dist/attr.mod.js',
	bundle: true,
	minify: true,
	format: 'esm',
});

esbuild.stop();
