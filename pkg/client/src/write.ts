import { createNode } from './create-node.ts'
import { PTR_IDENTIFIER } from './constant.ts'

// export const write = {
// 	[Symbol.toPrimitive]() {
// 		const PRIVATE_TOKEN = Symbol("PRIVATE_TOKEN")
// 		HTMLElement.prototype[PRIVATE_TOKEN] = function(fragment: [TemplateStringsArray, any[], symbol]) {
// 			delete HTMLElement.prototype[PRIVATE_TOKEN]
// 			createNode(fragment, this, false);
// 		}
// 		queueMicrotask(() => delete HTMLElement.prototype[PRIVATE_TOKEN])
// 	}
// }

// document.body[write](App())
