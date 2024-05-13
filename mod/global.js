const propMap = {};

export const globalGetter = new Proxy({}, {

	get: (t, prop) =>

		propMap[prop] ||
 
		(propMap[prop] = window[prop]) ||

		(propMap[prop] = (() => {
			const splittedPropBuffer = prop.split("_");
			const splittedPropBufferLength = splittedPropBuffer.length;
		
			let currentObjectCursor = globalThis;

			for(let propIndex = 0; propIndex < splittedPropBufferLength; propIndex++) {
				currentObjectCursor = currentObjectCursor[splittedPropBuffer[propIndex]];
			}

			return currentObjectCursor;
		})())
});

export const {

	Array: {
		isArray: Array_isArray
	},

	Proxy,
	Promise,
	Error,
	TypeError,

} = window;