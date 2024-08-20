const resolveComponentFn = (

	componentFn,
	attributes = {},

) => {
	const [ TSA_BUF, TVA_BUF, GENERATED_TIMESTAMP ] = componentFn(attributes);
	TSA_BUF.join(`<!-- --><!-- -->`)
}

const BASE_DF = document.createDocumentFragment();
const BASE_DIV = document.createElement("div");
BASE_DF.prepend(BASE_DF);

export const write = (documentTarget, componentFn) => {

	if(!(
		"createDocumentFragment" in window.document
	)) {
		return undefined;
	}

	const ROOT = resolveComponentFn(componentFn);
}