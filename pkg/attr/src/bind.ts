import { $ } from 'jsr:@ihasq/esptr@0.1.18';

export const bind = $((value: any, ref: HTMLInputElement) => {
	ref.addEventListener('input', ({ target }: InputEvent) => {
		if (!(target instanceof HTMLInputElement)) {
			return;
		}
		value.$ = target.value, { passive: true };
	});
	value.watch((newValue: any) => ref.value = newValue);
});
