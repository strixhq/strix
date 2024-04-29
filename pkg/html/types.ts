interface StrixHTMLTemplate {
	0: TemplateStringsArray;
	1: readonly any[];
}

type StrixHTMLElement = Function | StrixHTMLTemplate

type HTMLTemplateKey = string
type StrixAttributes = object

interface StrixAST {
	raw: string;
}

interface StrixElementProxy {
	
}

interface StrixController {
	close(): void;
}