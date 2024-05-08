export default (

	str: TemplateStringsArray,
	...val: any[]

): StrixHTMLTemplate => function fragmentGetter(i) {
	return !!new.target
		? fragmentGetter
		: i
			? str
			: val
}