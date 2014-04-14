var dispatchEvent = require("./event/dispatch-event.js")
var addEventListener = require("./event/add-event-listener.js")
var serializeElement = require("./serialize.js")

var htmlns = "http://www.w3.org/1999/xhtml"

module.exports = DOMElement

function DOMElement(tagName, owner, namespace) {
    if (!(this instanceof DOMElement)) {
        return new DOMElement(tagName)
    }

    var ns = namespace === undefined ? htmlns : (namespace || null)

    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName
    this.className = ""
    this.dataset = {}
    this.childNodes = []
    this.parentNode = null
    this.style = {}
    this.ownerDocument = owner || null
    this.namespaceURI = ns
}

DOMElement.prototype.type = "DOMElement"
DOMElement.prototype.nodeType = 1

DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
        child.parentNode.removeChild(child)
    }

    this.childNodes.push(child)
    child.parentNode = this
}

DOMElement.prototype.replaceChild =
    function _Element_replaceChild(elem, needle) {
        // TODO: Throw NotFoundError if needle.parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = this.childNodes.indexOf(needle)

        needle.parentNode = null
        this.childNodes[index] = elem
        elem.parentNode = this
    }

DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this

    var index = this.childNodes.indexOf(elem)

    this.childNodes[index].parentNode = null
    this.childNodes.splice(index, 1)
}

DOMElement.prototype.insertBefore =
    function _Element_insertBefore(newElement, referenceElement) {
        // TODO: Throw NotFoundError if referenceElement is a dom node
        // and parentNode !== this

        if (newElement.parentNode) {
            newElement.parentNode.removeChild(newElement)
        }

        var index = referenceElement ?
            this.childNodes.indexOf(referenceElement) :
            -1

        if (index > -1) {
            this.childNodes.splice(index, 0, newElement)
        } else {
            this.childNodes.push(newElement)
        }

        newElement.parentNode = this
    }

DOMElement.prototype.addEventListener = addEventListener
DOMElement.prototype.dispatchEvent = dispatchEvent

// Un-implemented
DOMElement.prototype.focus = function _Element_focus() {
    return void 0
}

DOMElement.prototype.toString = function _Element_toString() {
    return serializeElement(this)
}
