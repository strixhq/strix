const symbolBuf: { [key: symbol]: object } = {};

export const getPointer = (symbol: symbol): (object | undefined) => symbolBuf[symbol] ||= (globalThis as { [key: string]: any })[(symbol.description as string).slice(0, 16)]?.(symbol)