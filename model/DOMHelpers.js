
/**
 * Converts an object to a string with CSS format.
 * @param {Object} cssObject 
 * @returns CSS syntax
 */
export function objectToStyle(cssObject){
    let cssString = '';
    for (const property in cssObject){
        if (cssObject.hasOwnProperty(property)){
            cssString += `${property.replace(/_/g, '-')} : ${cssObject[property]}; `;
        }
    }
    return cssString
}

/**
 * Appends all key-value pairs as attributes to an HTML element
 * @param {HTMLElement} element 
 * @param {Object} attributesObject 
 * @returns 
 */
export function objectToAttr(element, attributesObject){
    if (!element) {
        console.error('Given element is undefined');
        return;
    }

    for (const attribute in attributesObject) {
        if (attributesObject.hasOwnProperty(attribute)) {
            element.setAttribute(attribute, attributesObject[attribute]);
        }
    }
}

/**
 * Creates and elements and append it to another.
 * @param {String} tag New element tag
 * @param {HTMLElement} parent Tag to append child to.
 * @param {String} content InnerHTML of new element.
 * @returns 
 */
export function createHtmlElement (tag, parent, content='') {
    let element = document.createElement(tag);
    element.innerHTML = content;
    parent.appendChild(element);
    return element;
}

/**
 * Appends and element to another.
 * @param {HTMLElement} child 
 * @param {HTMLElement} parent 
 */
export function appendHtmlElement(child, parent) {
    parent.appendChild(child);
}
