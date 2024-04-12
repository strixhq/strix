const hTempJoinedCache = {}; // パースされたデータ構文木を格納
const hTempRefCache = new WeakMap(); // hTempJoinedCacheのキーとテンプレートオブジェクトのセットを格納
const anchorStrTempCache = new WeakMap();
const getRandomTag = () =>
    `strix${
        btoa(
            String.fromCharCode.apply(
                null,
                crypto.getRandomValues(new Uint8Array(64)),
            ),
        ).replace(/[\/=]/g, '')
    }`;
const initTag = getRandomTag();
const globalTag = getRandomTag();

class HTemp {
    constructor() {
    }
}

const write = (container, component) => {
};

const html = (hTempStrings, ...hTempValues) => [hTempStrings, hTempValues];

{
    const hTempRef = window[globalTag].hTempRefCache.get(hTempStrings);
    if (!hTempRef) {
        const joinedHTemp = hTempStrings.join(initTag);
        const hTemp = hTempJoinedCache[hTempStrings.join(joinedHTemp)];
        if (!hTemp) {
        }
        hTempRefCache.set(hTempStrings, joinedHTemp);
    }
    const prebuiltTempAST = hTempJoinedCache[hTempRef];
}

function createLHAnchor() {
    let writeMode = 'frame';
    return [
        {},
    ];
}

function createLHInstance(templateFn, attributes) {
}

class LHInstance {
    constructor(templateFn, attributes) {
        templateFn(createLHAnchor()[0]);
    }
}

class LHTemplate {
    constructor() {
    }
}

class LHSelector {
    constructor() {
    }
}

const templateConstructor = globalThis.document.createElement('div');

const localSelector = (selectorTemplates, ...selectorValues) => {
    if (
        typeof selectorTemplates !== 'array' &&
        typeof selectorTemplates === 'function'
    ) {
    }
    return new Proxy({}, {
        get(t, props) {
            switch (props) {
                case 'onload': {
                    return;
                }
            }
        },
        set(t, props, value) {
            switch (props) {
                case 'onload': {
                    return value instanceof Function
                        ? () => {
                        }
                        : undefined;
                }
            }
        },
    });
};

const $ = new Proxy(localSelector, {
    get(t, p) {
    },
});
