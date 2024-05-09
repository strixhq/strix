export default (

	str: TemplateStringsArray,
	...val: any[]

): Function => function(i: any): (Function | any[] | TemplateStringsArray) {

	return new.target

		? (j: any): (any[] | TemplateStringsArray) => j
		
			? val
			: str
		
		: i

			? str
			: val

}