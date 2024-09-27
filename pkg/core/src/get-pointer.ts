const symbolBuf: any = {};

export const getPointer = (symbol: symbol): (object | undefined) => symbolBuf[symbol] ||= globalThis[(symbol.description as string).slice(0, 16)]?.(symbol)