const html = (str: TemplateStringsArray, ...val: any[]): StrixHTMLTemplate => ({ 0: str, 1: val });

html.copy = (StrixHTMLTemplate: StrixHTMLTemplate): StrixHTMLTemplate => ({ ...StrixHTMLTemplate });

export { html };