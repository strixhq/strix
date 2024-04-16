const h = ({ raw }: TemplateStringsArray, ...val: any[]): StrixHTMLTemplate => ({ 0: raw, 1: val });

h.version = '0.0.1';

export { h };