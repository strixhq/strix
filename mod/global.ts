export const globalGetter = new Proxy(Object.create(null), {

	get: (t, prop: string) =>
 
		window[prop] ||

		(() => {
			const splittedPropBuffer = prop.split("_");
			const splittedPropBufferLength = splittedPropBuffer.length;
		
			let currentObjectCursor = window;
			for(let propIndex = 0; propIndex < splittedPropBufferLength; propIndex++) {
				currentObjectCursor = currentObjectCursor[splittedPropBuffer[propIndex]];
			}

			return currentObjectCursor;
		})()
})