const h = ({ raw }, ...val) => [raw, val];

const hTempRefMap = new WeakMap();

const hTempMap = {};

let strixRequestId = '';

const writeLoopProcess = () => {
    strixRequestId = window.requestAnimationFrame(writeLoopProcess);
};

export class Writer {

    /**
     * 
     * @param { HTMLElement } container 
     * @param { Function } templateFn 
     */

    constructor(container, templateFn) {
        this.container = container;
        this.templateFn = templateFn;
        this.isWriting = true;
        this.isAborted = false;

        this.dispatchEvent();
    }

    pause() {
        this.isWriting = false;
    }

    resume() {
        this.isWriting = true;
    }

    close() {
        this.isWriting = false;
        this.isAborted = true;
    }
}

const mainApp = new Writer(document.body, Counter);

const mainLoop = () => {
    window.requestAnimationFrame(mainLoop);
    mainApp.write();
}

mainApp.addEventListener('', () => {

})