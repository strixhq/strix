import { $ } from 'jsr:@ihasq/esptr@0.1.9';

const { [Symbol.toPrimitive]: BASE_CSS_SYMBOL } = $((value, ref) => {
	Reflect.ownKeys(value).forEach((CSS_PROP_INDEX) => {
	});
});

createAttribute({
	color(value, ref) {
		if (value[Symbol.for('PTR_IDENTIFIER')]) {
			value.watch(newValue = ref.style.color = newValue);
		} else {
			ref.style.color = value;
		}
	},
});
