const htmlStrTempCache = new WeakMap();
const anchorStrTempCache = new WeakMap();

const h = (htmlTempStrings, ...htmlTempValues) => {
	const prebuiltTemp = htmlStrTempCache.get(htmlTempStrings);
	if(prebuiltTemp === undefined) {
		htmlStrTempCache.set(htmlTempStrings, {

		})
	}
}

function createLHAnchor() {
	let writeMode = "frame";
	return [
		{},

	]
}

function createLHInstance(templateFn, attributes) {
	
}

class LHInstance {
	constructor(templateFn, attributes) {
		templateFn(createLHAnchor()[0])
	}
}

class LHTemplate {
	constructor() {

	}
}

class LHSelector {
	constructor() {

	}
}

const templateConstructor = globalThis.document.createElement("div");

const initTag = ("libh" + btoa(
	String.fromCharCode.apply(
		null,
		crypto.getRandomValues(new Uint8Array(64)),
	)
) + "\u0020");

const localSelector = (selectorTemplates, ...selectorValues) => {
	if(
		typeof selectorTemplates !== "array" &&
		typeof selectorTemplates === "function"
	) {

	}
	return new Proxy({}, {
		get(t, props) {
			switch(props) {
				case "onload": {
					return 
				}
			}
		},
		set(t, props, value) {
			switch(props) {
				case "onload": {
					return value instanceof Function
						? () => {
							
						}
						: undefined;
				}
			}
		}
	});
}

const $ = new Proxy(localSelector, {
	get(t, p) {

	}
});

const html = (htmlTemplates, ...htmlValues) => {
	if(!templateCache.has(htmlTemplates)) {
		const joinedHTMLTemplates = htmlTemplates.join(initTag);
		templateConstructor.innerHTML = joinedHTMLTemplates;
		// instanceBuffer.htmlTempMap.set(joinedHTMLTemplates, );
	}

	const joinedString = htmlTemplates.join(""),
		encodedHTMLTemp = templateCache.get(joinedString);

	if(encodedHTMLTemp === undefined) {
		// initialization start
		htmlValues.forEach(valueIndex => {
			switch(true) {
				case valueIndex instanceof Function: {
					
				}
			}
		})
		instanceBuffer.htmlTempMap.set(joinedString);
	}

}

html.class = function(templateFn) {

}

html.map = function(constructorFn) {
	
};

html.selector = function() {

};

html.use = function(anchor) {

};

class LHInstance {
	constructor(templateFn, attributes) {
		templateFn(createLHAnchor()[0])
	}
}

Object.freeze(html);

const write = (targetSelectors) => {
	for(const targetSelectorIndex in targetSelectors) {
		globalThis.document.querySelector(targetSelectorIndex)
	}
}

export { write };