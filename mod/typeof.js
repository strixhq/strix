import { globalGetter } from "./global";
import { get, set } from "./property";

const { WeakMap } = globalGetter;

const typeMap = new WeakMap();

export const typeOf = (target) => typeMap[get](target) || (() => {
	const type = typeof target;
	typeMap[set](target, type);
	return type;
})()