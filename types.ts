type StrixHTMLTemplate = Function;

type StrixProperties = object

type StrixHTMLElement = ((StrixProperties: StrixProperties) => (StrixProperties: StrixProperties) => StrixHTMLTemplate) | (StrixHTMLTemplate)

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