import { globalGetter } from "../../mod/global.ts";
import { createTag } from "../../mod/tag.ts";
const { Promise, RegExp, WeakMap, document } = globalGetter

// Pre-fetching builtin functions and classes, which reduces minified file size ;)

const baseDocumentFragment = document.createDocumentFragment().appendChild(document.createElement('div'));
const baseCommentAnalyzer = document.createTreeWalker(baseDocumentFragment, 0x80);

const HTMLTemplateAnalyzerTag = `stval${createTag(16)}`;
const HTMLTemplateAnalyzerTagRegEx = new RegExp(HTMLTemplateAnalyzerTag);

const AnalyzedASTKeyMap = new WeakMap();
const AnalyzedASTMap = {};

const HTMLWritePathMap = new WeakMap();

const HTMLTemplateMap = new WeakMap();

/**
 * 
 * @param { App } container 
 * @param { Function } StrixHTMLElement
 * @returns { void | Promise<void> }
 */

const main = (

	container,
	StrixHTMLElement

) => {

	// resolving strix element
	const entryPoint = createEntryPoint(StrixHTMLElement);
	baseDocumentFragment.innerHTML = "";

};

/**
 * 
 * @param { App } container 
 * @param { Function | Promise<Function> } element 
 * @returns { void | Promise<void> }
 */

const write = (

	container,
	element

) => element instanceof Promise
	? element.then(resolvedElement => main(container, resolvedElement))
	: main(container, element);

export default write;