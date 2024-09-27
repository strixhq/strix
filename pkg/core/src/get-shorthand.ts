export const getShorthand: object = new Proxy({}, { get: (_, concattedMethodName: string) => {
	const [className, methodName] = concattedMethodName.split("_")
	return (globalThis as { [key: string]: any })[className as string][methodName];
} })
