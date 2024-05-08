export default (

	str: TemplateStringsArray,
	...val: any[]

): StrixHTMLTemplate => function(i) {

	return !!new.target
		? j => j
			? val
			: str
		: i
			? str
			: val

};