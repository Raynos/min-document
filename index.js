var DOMText = require("./dom-text.js")
var DOMElement = require("./dom-element.js")
var DocumentFragment = require("./dom-fragment.js")
var Event = require("./event.js")

var body = createElement("body")
var documentElement = createElement("html")

documentElement.appendChild(body)

module.exports = Document()

function Document() {
    return {
        body: body,
        documentElement: documentElement,
        createTextNode: createTextNode,
        createElement: createElement,
        createDocumentFragment: createDocumentFragment,
        createEvent: createEvent,
        getElementById: getElementById,
        Document: Document,
        Text: DOMText,
        Element: DOMElement,
        DocumentFragment: DocumentFragment
    }
}

function ownerDocument(that, node) {
    node.ownerDocument = that
    return node
}

function createTextNode(value) {
    return  ownerDocument(this, new DOMText(value))
}

function createElement(tagName) {
    return ownerDocument(this, new DOMElement(tagName))
}

function createDocumentFragment() {
    return ownerDocument(this, new DocumentFragment())
}

function createEvent(family) {
    return new Event(family)
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
