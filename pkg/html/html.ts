const html = (str: TemplateStringsArray, ...val: any[]): StrixHTMLTemplate => ({ 0: str, 1: val });

export default html;