/**
 * 
 * @param { number } isNew
 * @returns { Function }
 */

export const tmp = isNew => Object.assign(

	(

		a,
		...b

	) => i => isNew ^ i

		? a
		: b

	,

	isNew

		? 0
		: {
			new: tmp(1)
		}

);