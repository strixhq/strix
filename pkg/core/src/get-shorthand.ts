export const getShorthand: object = new Proxy({}, { get: (_, concattedMethodName: string) => {
	const [className, methodName] = concattedMethodName.split("_")
	return globalThis[className][methodName];
} })
