const symbolBuf: { [key: symbol]: object } = {};

export const getPointer = (symbol: symbol): (object | undefined) => symbolBuf[symbol] ||= (globalThis as { [key: symbol]: any })[(symbol.description as string).slice(0, 16)]?.(symbol)