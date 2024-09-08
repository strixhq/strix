import { createNode } from "./create-node.js";

/**
 * @param { any[] } fragment
 * @returns { HTMLBodyElement }
 */
export const createBody = (fragment) => createNode(fragment, document.createElement("body"));