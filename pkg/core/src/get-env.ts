export const getEnv: object = new Proxy({}, { get: (_, variableName: string) => Symbol.for(variableName) })
