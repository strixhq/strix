type HTMLContainer = HTMLElement | DocumentFragment
type HTMLTemplateKey = string

interface StrixController {
	close(): void;
}

interface StrixHTMLTemplate {
	0: readonly string[];
	1: readonly any[];
}