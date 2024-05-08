export default (

	str: TemplateStringsArray,
	...val: any[]

): StrixHTMLTemplate => function(i: boolean): (Function | any[] | TemplateStringsArray) {

	return !!new.target

		? (j: boolean): (any[] | TemplateStringsArray) => j

			? val
			: str

		: i

			? str
			: val
}