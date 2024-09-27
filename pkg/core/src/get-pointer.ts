const symbolBuf: any = {};

export const getPointer = (symbol: symbol): (object | undefined) => symbolBuf[symbol] ||= globalThis[symbol.description.slice(0, 16)]?.(symbol)