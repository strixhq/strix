const h = (str: TemplateStringsArray, ...val: any[]): StrixHTMLTemplate => ({ 0: str, 1: val });

h.version = '0.0.1';

export { h };