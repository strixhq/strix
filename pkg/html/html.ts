export default (

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