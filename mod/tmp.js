/**
 * 
 * @param { number } isNew 
 * @param { number } type 
 * @returns 
 */

export const tmp = (

	isNew,
	type,

) => Object.assign(

	(

		a,
		...b

	) => i => isNew ^ i

		? a
		: b

	,

	{ type },

	isNew

		? null
		: {
			new: tmp(1, type)
		}

);