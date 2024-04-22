type HTMLContainer = HTMLElement | DocumentFragment
type HTMLTemplate = Function | StrixHTMLTemplate
type HTMLTemplateKey = string
interface StrixElementProxy {
	
}

interface StrixController {
	close(): void;
}

interface StrixHTMLTemplate {
	0: readonly string[];
	1: readonly any[];
}