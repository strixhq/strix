import { createTag } from "../html/tag";

// Pre-fetching builtin functions and classes, which reduces minified file size ;)

const {

	Object: {
		defineProperties: OBJECT_defineProperties
	},

	Promise,
	Proxy,
	RegExp,
	WeakMap,

	DragEvent,
	KeyboardEvent,
	MouseEvent,
	PointerEvent,

	document,

	requestAnimationFrame,
	requestIdleCallback,
	cancelAnimationFrame,

} = window;


const baseDocumentFragment = document.createDocumentFragment().appendChild(document.createElement('div'));
const baseCommentAnalyzer = document.createTreeWalker(baseDocumentFragment, 0x80);

const HTMLTemplateAnalyzerTag = `stval${createTag()}`;
const HTMLTemplateAnalyzerTagRegEx = new RegExp(HTMLTemplateAnalyzerTag);

const AnalyzedASTKeyMap = new WeakMap();
const AnalyzedASTMap = {};

const HTMLWritePathMap = new WeakMap();

const HTMLTemplateMap = new WeakMap();

const createStrixElement: Function = (() => {

	const resolverProcess = {

		function(StrixElement) {

		},

		object(StrixElement) {

		}

	};

	return (StrixElement, StrixTemplateCache) => {
		resolverProcess[typeof StrixElement]?.(StrixElement);
		StrixTemplateCache.set(StrixElement)
	};
})();

const parseStrixElement: Function = (TemplateStringsArray: TemplateStringsArray): StrixAST => {

}

const resolveStrixElement: Function = (
	StrixHTMLElement: StrixHTMLElement,
	StrixAttributes: StrixAttributes
) => {
	// StrixTemplateCache.get(StrixElement) || StrixTemplateCache.set(...createStrixElement(StrixElement)).get(StrixElement);

};

const main = (

	container: any,
	StrixHTMLElement: StrixHTMLElement

): void => {
	// resolving strix element
	const entryPoint = resolveStrixElement(StrixHTMLElement, {});
	baseDocumentFragment.innerHTML = "";
};

export const write = (

	container: any,
	element: Function | StrixHTMLElement | Promise<StrixHTMLElement>

): void | Promise<void> => element instanceof Promise
	? element.then(resolvedElement => main(container, resolvedElement))
	: main(container, element);