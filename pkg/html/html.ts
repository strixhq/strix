

const html = (str: TemplateStringsArray, ...val: any[]): StrixHTMLTemplate => ({ 0: str, 1: val });

html.version = '0.0.1';

export { html };