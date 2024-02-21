
export function objectToStyle(cssObject){
    let cssString = '';
    for (const property in cssObject){
        if (cssObject.hasOwnProperty(property)){
            cssString += `${property.replace(/_/g, '-')} : ${cssObject[property]}; `;
        }
    }
    return cssString
}

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

export function createHtmlElement (tag, parent, content='') {
    let element = document.createElement(tag);
    element.innerHTML = content;
    parent.appendChild(element);
    return element;
}

export function appendHtmlElement(child, parent) {
    parent.appendChild(child);
}
