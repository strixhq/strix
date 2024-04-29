interface StrixHTMLTemplate {
	0: readonly string[];
	1: readonly any[];
}

type StrixHTMLElement = Function | StrixHTMLTemplate

type HTMLTemplateKey = string
type StrixAttributes = object
interface StrixElementProxy {
	
}

interface StrixController {
	close(): void;
}