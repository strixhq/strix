const h = ({ raw }, ...val) => [raw, val];

const hTempRefMap = new WeakMap();

const hTempMap = {};

let strixRequestId = '';

const writeLoopProcess = () => {
    strixRequestId = window.requestAnimationFrame(writeLoopProcess);
};

/**
 * @param { HTMLElement } container
 * @param { Function } templateFn
 * @returns { Function }
 */

export const write = (container, templateFn) => {
    let isWriting = true,
        isAborted = false;
    container.insertBefore();
    return {
        pause() {
            isWriting = false;
        },

        resume() {
            isWriting = true;
        },

        close() {
            isAborted = true;
        },
    };
};
