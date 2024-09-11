import { $ } from 'jsr:@ihasq/esptr@0.1.9';

export const bind = $((value, ref) => {
	ref.addEventListener('input', ({ target: { value: newValue } }) => $[value] = newValue, { passive: true });
	value.watch((newValue: any) => ref.value = newValue);
});
