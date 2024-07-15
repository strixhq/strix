import { $ } from "@strix/std";

const resolveComponentFn = (

	componentFn,
	attributes = {},

) => {
	const [ TSA_BUF, TVA_BUF, GENERATED_TIMESTAMP ] = componentFn(attributes);
	TSA_BUF.join(`<!-- --><!-- -->`)
}

export const write = (documentTarget, componentFn) => {
	const ROOT = resolveComponentFn(componentFn);
}