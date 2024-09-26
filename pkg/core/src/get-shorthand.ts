export const getShorthand: object = new Proxy({}, { get: (_, methodName: string) => {
	let resolveBuffer = globalThis;
	methodName.split("_").forEach(index => resolveBuffer = resolveBuffer[index])
	return resolveBuffer;
} })
