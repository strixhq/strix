const main = (

	str: TemplateStringsArray,
	val: any[]

) => function(
	
	i: any

) {
	return new.target
		? j => j
			? val
			: str
		: i
			? str
			: val
}

export default (

	str: TemplateStringsArray,
	...val: any[]

) => main(str, val);