import { random } from "jsr:@ihasq/random@0.1.6";

console.log(random(32))

const
	PUBLISHED_PTR = {},

	GLOBAL_TOKEN = (() => {
		let TOKEN_BUF = random(32);
		while(`Symbol(${TOKEN_BUF})` in window) {
			TOKEN_BUF = random(32);
		}
		return TOKEN_BUF;
	})(),

	SETTER_STD = (

		newValue: undefined,
		watcherFnList: Function[]

	) => {
		watcherFnList.forEach(watcherFn => watcherFn(newValue));
		return newValue;
	},

	$ = (

		value: undefined,
		setterFn: Function = newValue => newValue,
		watcherFnList: Function[] = []

	): object => {
		const
			BASE_SYMBOL = Symbol(GLOBAL_TOKEN),
			BASE_PTR = {
				set value(newValue) {
					value = SETTER_STD(setterFn(newValue), watcherFnList)
				},
				get value() {
					return value;
				},
				set $(newValue) {
					value = SETTER_STD(setterFn(newValue), watcherFnList)
				},
				get $() {
					return value
				},
				watch(watcherFn: Function) {
					watcherFnList.push(watcherFn);
					return this;
				},
				publishSymbol() {
					const NEW_SYMBOL = Symbol(GLOBAL_TOKEN);
					PUBLISHED_PTR[NEW_SYMBOL] = this;
					return NEW_SYMBOL;
				},
				fork() {
					return $(value);
				}
			}
		;

		PUBLISHED_PTR[BASE_SYMBOL] = BASE_PTR;
		return BASE_PTR
	}
;

Object.defineProperty(window, `Symbol(${GLOBAL_TOKEN})`, {
	configurable: false,
	enumerable: false,
	value: (symbol: symbol) => symbol in PUBLISHED_PTR
		? PUBLISHED_PTR[symbol]
		: undefined
})

export { $ }