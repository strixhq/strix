Object.assign(globalThis, {
	get IVE() {
		return {
			get write() {
				return async function(target) {
					const module = await import(target.getAttribute('src'));
				}
			}
		}
	}
})