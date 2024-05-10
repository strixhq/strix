/**
 * 
 * @param { TemplateStringsArray } str 
 * @param  { any[] } val 
 * @returns { Function }
 */

const html = (

	str,
	...val

) => function(i) {

	return new.target

		? j => j
		
			? val
			: str
		
		: i

			? str
			: val

}

export default html;