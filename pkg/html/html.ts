const html = (

	str: TemplateStringsArray,
	...val: any[]

): StrixHTMLTemplate => function(n) {

	return !!new.target
		? [
			str,
			val
		]
		: n
			? str
			: val

};

export default html;

/**
const instance = new html`
	<div>${Date.now()}</div>
`;
const another = instance;

 */