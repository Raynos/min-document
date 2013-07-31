var DOMText = require("./dom-text.js")
var DOMElement = require("./dom-element.js")
var DocumentFragment = require("./dom-fragment.js")

var body = createElement("body")

module.exports = Document()

function Document() {
    return {
        body: body,
        createTextNode: createTextNode,
        createElement: createElement,
        createDocumentFragment: createDocumentFragment,
        getElementById: getElementById,
        Document: Document,
        Text: DOMText,
        Element: DOMElement,
        DocumentFragment: DocumentFragment
    }
}

function createTextNode(value) {
    return new DOMText(value)
}

function createElement(tagName) {
    return new DOMElement(tagName)
}

function createDocumentFragment() {
    return new DocumentFragment()
}

/*
* getElementById returns the Element whose ID is given by elementId.
* If no such element exists, returns null.
* Behavior is not defined if more than one element has this ID.
*/
function getElementById(id, parent) {
    if (!parent) {
        parent = body
    }

    if (String(parent.id) === String(id)) {
        return parent
    }

    var arr = parent.childNodes
    var result = null

    if (!arr) {
        return result
    }

    for (var i = 0, len = arr.length; !result && i < len; i++) {
        result = getElementById(id, arr[i])
    }

    return result
}

