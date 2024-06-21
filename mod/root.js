export const CLIENT_ROOT_KEY = Symbol("STRIX_ROOT");

const ATTRIBUTE_REGISTRY = {
	generate(attributeCollection) {

	},

	get(ref, attributeCollection) {

	}
}

const GLOBAL_ATTRIBUTE_REGISTRY = {};

export const createAttribute = (attributeConfig) => {

	const MODULE_SYMBOL = Symbol("STRIX_ATTR_MOD");
	const REGISTRY = {};

	Object.keys(attributeConfig)
		.forEach(x => {
			const symbol = Symbol(`STRIX_ATTR_INT_${x}`);
			REGISTRY[x] = {
				symbol,
				callback: attributeConfig[x]
			}
			GLOBAL_ATTRIBUTE_REGISTRY[symbol] = attributeConfig[x];
		});
	
	
	Object.defineProperty(GLOBAL_ATTRIBUTE_REGISTRY, MODULE_SYMBOL, {
		set(interfaceCollection = {}) {
			
		},
		configurable: false,
	})

	return new Proxy({

		toString() {
			return MODULE_SYMBOL
		}

	}, {

		get(_, prop) {
			return {

				toString() {
					return REGISTRY[prop]
				}

			}
		}

	})
}
