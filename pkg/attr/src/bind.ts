import { $ } from 'jsr:@strix/std@0.1.11'

export const bind = $((value: any, ref: HTMLInputElement) => {
	ref.addEventListener('input', ({ target }: InputEvent) => {
		if (!(target instanceof HTMLInputElement)) {
			return
		}
		value.$ = target.value, { passive: true }
	})
	value.watch((newValue: any) => ref.value = newValue)
})
